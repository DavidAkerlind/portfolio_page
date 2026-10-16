import { site } from '../data/links.js';

// What differs between the English and the Swedish home page. The English values are
// the ones written in index.html; the Swedish page gets the others swapped in at build
// time (scripts/prerender.mjs), and the page swaps them in the browser when the visitor
// changes language without reloading (src/lib/pageHead.js). Plain JavaScript, so the
// build script can import it too.
export const meta = {
	en: {
		lang: 'en',
		url: `${site.url}/`,
		title: 'David Åkerlind – Computer Science and AI student',
		description:
			'Portfolio of David Åkerlind, a Computer Science student specialising in Artificial Intelligence at Karlstad University. Projects, experience and interests.',
		imageAlt:
			'David Åkerlind, Computer Science and Artificial Intelligence, next to a portrait of him on a boat deck',
		person:
			'Computer Science student specialising in Artificial Intelligence at Karlstad University.',
		locale: 'en_GB',
		otherLocale: 'sv_SE',
	},
	sv: {
		lang: 'sv',
		url: `${site.url}/sv/`,
		title: 'David Åkerlind – student i datavetenskap och AI',
		description:
			'Portfolio för David Åkerlind, student i datavetenskap med inriktning mot artificiell intelligens vid Karlstads universitet. Projekt, erfarenhet och intressen.',
		imageAlt:
			'David Åkerlind, datavetenskap och artificiell intelligens, bredvid ett porträtt av David på ett båtdäck',
		person:
			'Student i datavetenskap med inriktning mot artificiell intelligens vid Karlstads universitet.',
		locale: 'sv_SE',
		otherLocale: 'en_GB',
	},
};
