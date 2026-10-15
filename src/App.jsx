import { lazy, Suspense, useEffect } from 'react';
import { startSmoothAnchors } from './lib/smoothScroll';
import { LangProvider } from './i18n/LangProvider';
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
	const route = normalise(path);
	const Page = Object.hasOwn(PAGES, route) ? PAGES[route] : NotFoundPage;
	// The not-found page is one static file for every address, so it stays English.
	const lang = route === '/sv' ? 'sv' : 'en';

	useEffect(startSmoothAnchors, []);

	return (
		<LangProvider lang={lang}>
			<Suspense fallback={null}>
				<Page />
			</Suspense>
		</LangProvider>
	);
}

export default App;
