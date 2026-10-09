import { useEffect, useState } from 'react';
import UnderConstructionPage from './pages/UnderConstructionPage/UnderConstructionPage';
import StyleGuidePage from './pages/StyleGuidePage/StyleGuidePage';
import HomePage from './pages/HomePage/HomePage';

// Work in progress is previewed by hash, while the under-construction page stays
// the default: /#home is the new site, /#styleguide is the design system.
// Once a preview page is open it stays open, so its in-page links
// (#projects, #colors, ...) work. When the new site is ready, make HomePage the default.
const PREVIEW_PAGES = {
	'#home': HomePage,
	'#styleguide': StyleGuidePage,
};

const previewFor = (hash) => (Object.hasOwn(PREVIEW_PAGES, hash) ? hash : null);

function App() {
	const [preview, setPreview] = useState(() => previewFor(window.location.hash));

	useEffect(() => {
		const onHashChange = () => {
			const next = previewFor(window.location.hash);
			if (next) {
				setPreview(next);
			}
		};
		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	}, []);

	const Page = PREVIEW_PAGES[preview] ?? UnderConstructionPage;

	return <Page />;
}

export default App;
