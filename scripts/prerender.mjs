// Runs after the two Vite builds (`npm run build`). Renders each page to HTML with
// the server build in dist-server and writes it into dist, so visitors and search
// engines get the whole page at once and React only has to hydrate it. It also
// inlines the page's CSS, preloads the main fonts and adds the head tags that
// differ from page to page.
import { access, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { links, site } from '../src/data/links.js';
import { meta } from '../src/i18n/meta.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const serverDir = join(root, 'dist-server');

const template = await readFile(join(dist, 'index.html'), 'utf8');
const assets = await readdir(join(dist, 'assets'));
const { render } = await import(pathToFileURL(join(serverDir, 'entry-server.js')));

// Structured data for search engines: who the site is about and where else they are.
const jsonLdFor = ({ lang, url, person }) => ({
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'WebSite',
			'@id': `${url}#website`,
			url,
			name: site.name,
			inLanguage: lang,
		},
		{
			'@type': 'Person',
			'@id': `${site.url}/#person`,
			name: site.name,
			url: `${site.url}/`,
			image: `${site.url}/og-image.jpg`,
			description: person,
			sameAs: [links.github, links.linkedin],
			affiliation: {
				'@type': 'CollegeOrUniversity',
				name: 'Karlstad University',
				url: 'https://www.kau.se',
			},
			knowsAbout: [
				'Artificial intelligence',
				'Machine learning',
				'Hugging Face',
				'Python',
				'React',
				'Front-end development',
			],
		},
	],
});

// The fonts used above the fold. They are preloaded so text appears in the right
// typeface at once instead of swapping.
const PRELOAD_FONTS = [
	/^dm-sans-latin-wght-normal-.+\.woff2$/,
	/^dm-serif-display-latin-400-normal-.+\.woff2$/,
	/^dm-serif-display-latin-400-italic-.+\.woff2$/,
	/^dm-mono-latin-400-normal-.+\.woff2$/,
];

// `path` is what the app renders, `file` where it is written in dist. Cloudflare
// Pages serves dist/styleguide/index.html at /styleguide and uses 404.html for any
// path that does not exist, with a real 404 status. `css` is the stylesheet of a
// page that loads its own code (the others are in the main stylesheet).
const pages = [
	{ path: '/', file: 'index.html', lang: 'en' },
	{ path: '/sv', file: 'sv/index.html', lang: 'sv' },
	{
		path: '/styleguide',
		file: 'styleguide/index.html',
		title: 'Style guide · David Åkerlind',
		noindex: true,
		css: /^StyleGuidePage-.+\.css$/,
	},
	{
		path: '/page-not-found',
		file: '404.html',
		title: 'Page not found · David Åkerlind',
		noindex: true,
	},
];

const escapeHtml = (text) =>
	text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const exists = (path) => access(path).then(() => true, () => false);

function assetNamed(pattern) {
	const name = assets.find((file) => pattern.test(file));
	if (!name) throw new Error(`No built file in dist/assets matches ${pattern}`);
	return `/assets/${name}`;
}

// Replace with a function, never a string: the text may contain `$` patterns.
const replaceOnce = (html, search, replacement) => {
	if (!html.includes(search)) throw new Error(`Could not find ${search} in the page`);
	return html.replace(search, () => replacement);
};

async function inlineStylesheets(html) {
	const tags = [...html.matchAll(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g)];
	let result = html;
	for (const [tag, href] of tags) {
		const css = await readFile(join(dist, href), 'utf8');
		result = replaceOnce(result, tag, `<style>${css}</style>`);
	}
	return result;
}

// The home page keeps the tags from index.html and gets the structured data. A page
// that must stay out of search results gets its own title and a noindex tag, and
// loses the canonical link and the social tags that point at the home page.
function withHead(html, { title, noindex, lang }) {
	let result = html;
	if (noindex) {
		result = result
			.replace(/<title>.*?<\/title>/s, () => `<title>${escapeHtml(title)}</title>`)
			.replace(/\s*<link rel="(?:canonical|alternate)"[^>]*>/g, '')
			.replace(/\s*<meta\s+(?:property="og:|name="twitter:|name="description"|name="robots")[^>]*>/g, '');
		result = replaceOnce(result, '</head>', '\t\t<meta name="robots" content="noindex" />\n\t</head>');
	} else {
		// index.html is written for the English page; the Swedish page swaps the
		// language-bound parts for the Swedish ones.
		if (lang !== 'en') {
			const en = meta.en;
			const here = meta[lang];
			const swaps = [
				['<html lang="en">', `<html lang="${here.lang}">`],
				[escapeHtml(en.title), escapeHtml(here.title)],
				[escapeHtml(en.description), escapeHtml(here.description)],
				[escapeHtml(en.imageAlt), escapeHtml(here.imageAlt)],
				[`<link rel="canonical" href="${en.url}" />`, `<link rel="canonical" href="${here.url}" />`],
				[`<meta property="og:url" content="${en.url}" />`, `<meta property="og:url" content="${here.url}" />`],
				[`<meta property="og:locale" content="${en.locale}" />`, `<meta property="og:locale" content="${here.locale}" />`],
				[`<meta property="og:locale:alternate" content="${en.otherLocale}" />`, `<meta property="og:locale:alternate" content="${here.otherLocale}" />`],
			];
			for (const [from, to] of swaps) {
				if (!result.includes(from)) throw new Error(`Could not find ${from} in index.html`);
				result = result.replaceAll(from, () => to);
			}
		}
		result = replaceOnce(
			result,
			'</head>',
			`\t\t<script type="application/ld+json">${JSON.stringify(jsonLdFor(meta[lang]))}</script>\n\t</head>`,
		);
	}
	return result;
}

const preloads = PRELOAD_FONTS.map(
	(pattern) =>
		`\t\t<link rel="preload" href="${assetNamed(pattern)}" as="font" type="font/woff2" crossorigin />\n`,
).join('');

for (const page of pages) {
	const markup = await render(page.path);

	let html = withHead(template, page);
	html = await inlineStylesheets(html);
	html = replaceOnce(html, '<meta name="viewport" content="width=device-width, initial-scale=1.0" />', `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n${preloads.trimEnd()}`);
	if (page.css) {
		const css = await readFile(join(dist, assetNamed(page.css)), 'utf8');
		html = replaceOnce(html, '</head>', `\t\t<style>${css}</style>\n\t</head>`);
	}
	html = replaceOnce(html, '<div id="root"></div>', `<div id="root">${markup}</div>`);

	// Every built asset the HTML points at must really be in dist.
	const missing = [];
	for (const [, url] of html.matchAll(/(?:src|href|poster)="(\/assets\/[^"?#]+)/g)) {
		if (!(await exists(join(dist, url)))) missing.push(url);
	}
	if (missing.length > 0) {
		throw new Error(`${page.path} points at files that are not in dist: ${[...new Set(missing)].join(', ')}`);
	}

	const out = join(dist, page.file);
	await mkdir(dirname(out), { recursive: true });
	await writeFile(out, html);
	console.log(`prerendered ${page.path} -> dist/${page.file} (${(html.length / 1024).toFixed(1)} kB)`);
}

// The server build is only a build tool, never deployed.
await rm(serverDir, { recursive: true, force: true });
