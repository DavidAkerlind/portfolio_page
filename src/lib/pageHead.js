import { meta } from '../i18n/meta';

// The head tags that depend on the page's language, set again when the visitor changes
// language without a reload. The built pages already have the right ones (see
// scripts/prerender.mjs); this keeps the title, the tab and a later share in step.
const set = (selector, attribute, value) =>
	document.head.querySelector(selector)?.setAttribute(attribute, value);

export function applyPageHead(lang) {
	const here = meta[lang];
	document.documentElement.lang = here.lang;
	document.title = here.title;
	set('meta[name="description"]', 'content', here.description);
	set('link[rel="canonical"]', 'href', here.url);
	set('meta[property="og:url"]', 'content', here.url);
	set('meta[property="og:title"]', 'content', here.title);
	set('meta[property="og:description"]', 'content', here.description);
	set('meta[property="og:image:alt"]', 'content', here.imageAlt);
	set('meta[property="og:locale"]', 'content', here.locale);
	set('meta[property="og:locale:alternate"]', 'content', here.otherLocale);
	set('meta[name="twitter:title"]', 'content', here.title);
	set('meta[name="twitter:description"]', 'content', here.description);
}
