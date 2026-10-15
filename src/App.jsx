import { lazy, Suspense, useEffect } from 'react';
import { startSmoothAnchors } from './lib/smoothScroll';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// The design system page is only for preview, so it loads on its own and never
// weighs down the home page.
const StyleGuidePage = lazy(() => import('./pages/StyleGuidePage/StyleGuidePage'));

// Real paths, no hashes: / is the site and /styleguide is the design system.
// Anything else is the not-found page. In-page links (#projects, #colors, ...)
// stay anchors within a page.
const PAGES = {
	'/': HomePage,
	'/styleguide': StyleGuidePage,
};

const normalise = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path) || '/';

function App({ path = window.location.pathname }) {
	const route = normalise(path);
	const Page = Object.hasOwn(PAGES, route) ? PAGES[route] : NotFoundPage;

	useEffect(startSmoothAnchors, []);

	return (
		<Suspense fallback={null}>
			<Page />
		</Suspense>
	);
}

export default App;
