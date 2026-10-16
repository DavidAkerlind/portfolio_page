import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { startSmoothAnchors } from './lib/smoothScroll';
import { applyPageHead } from './lib/pageHead';
import { LangProvider } from './i18n/LangProvider';
import { homePath } from './i18n/lang';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// The design system page is only for preview, so it loads on its own and never
// weighs down the home page.
const StyleGuidePage = lazy(() => import('./pages/StyleGuidePage/StyleGuidePage'));

// Real paths, no hashes: / is the site, /sv/ the same site in Swedish and /styleguide
// the design system. Anything else is the not-found page. In-page links (#projects, #colors, ...)
// stay anchors within a page.
const PAGES = {
	'/': HomePage,
	'/sv': HomePage,
	'/styleguide': StyleGuidePage,
};

const normalise = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path) || '/';

function App({ path = window.location.pathname }) {
	const [route, setRoute] = useState(() => normalise(path));
	// Where the language links sat on screen before a language change.
	const linkTop = useRef(null);
	const Page = Object.hasOwn(PAGES, route) ? PAGES[route] : NotFoundPage;
	// The not-found page is one static file for every address, so it stays English.
	const lang = route === '/sv' ? 'sv' : 'en';
	const isHome = route === '/' || route === '/sv';

	useEffect(startSmoothAnchors, []);

	// Back and forward between / and /sv/ (the language change below adds a history
	// entry) show the other language without a reload as well.
	useEffect(() => {
		const onPopState = () => setRoute(normalise(window.location.pathname));
		window.addEventListener('popstate', onPopState);
		return () => window.removeEventListener('popstate', onPopState);
	}, []);

	// Changing language on the home page does not load a new page: the address changes,
	// the texts are swapped in place and the page stays where it was. The language links
	// are at the bottom, so afterwards they are put back where the visitor clicked
	// (the Swedish text is not exactly as tall as the English).
	const switchLang = useCallback((code) => {
		const next = normalise(homePath(code));
		linkTop.current = document.querySelector('.site-footer-languages')?.getBoundingClientRect().top ?? null;
		window.history.pushState(null, '', homePath(code) + window.location.hash);
		setRoute(next);
	}, []);

	useLayoutEffect(() => {
		if (linkTop.current === null) return;
		const now = document.querySelector('.site-footer-languages')?.getBoundingClientRect().top;
		if (now !== undefined) window.scrollBy({ top: now - linkTop.current, behavior: 'instant' });
		linkTop.current = null;
	}, [route]);

	useEffect(() => {
		if (isHome) applyPageHead(lang);
	}, [isHome, lang]);

	return (
		<LangProvider lang={lang} onSwitch={isHome ? switchLang : null}>
			<Suspense fallback={null}>
				<Page />
			</Suspense>
		</LangProvider>
	);
}

export default App;
