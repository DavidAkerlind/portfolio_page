// Runs after the two Vite builds (`npm run build`). Renders each page to HTML with
// the server build in dist-server and writes it into dist, so visitors and search
// engines get the whole page at once and React only has to hydrate it.
import { access, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const serverDir = join(root, 'dist-server');

const template = await readFile(join(dist, 'index.html'), 'utf8');
const { render } = await import(pathToFileURL(join(serverDir, 'entry-server.js')));

// `path` is what the app renders, `file` where it is written in dist. Cloudflare
// Pages serves dist/styleguide/index.html at /styleguide and uses 404.html for any
// path that does not exist, with a real 404 status.
const pages = [
	{ path: '/', file: 'index.html' },
	{
		path: '/styleguide',
		file: 'styleguide/index.html',
		title: 'Style guide · David Åkerlind',
		noindex: true,
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

function withHead(html, { title, noindex }) {
	let result = html;
	if (title) {
		result = result.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
	}
	if (noindex) {
		result = result.replace('</head>', '\t\t<meta name="robots" content="noindex" />\n\t</head>');
	}
	return result;
}

const exists = (path) => access(path).then(() => true, () => false);

for (const page of pages) {
	const markup = await render(page.path);
	if (!template.includes('<div id="root"></div>')) {
		throw new Error('dist/index.html has no empty <div id="root"></div> to fill');
	}

	const html = withHead(template, page).replace(
		'<div id="root"></div>',
		`<div id="root">${markup}</div>`,
	);

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
