import { useEffect, useState } from 'react';
import UnderConstructionPage from './pages/UnderConstructionPage/UnderConstructionPage';
import StyleGuidePage from './pages/StyleGuidePage/StyleGuidePage';

// The design system preview lives at /#styleguide until the real pages exist.
// Once opened it stays open, so its own in-page links (#colors, #type, ...) work.
const STYLE_GUIDE_HASH = '#styleguide';

function App() {
	const [showStyleGuide, setShowStyleGuide] = useState(
		window.location.hash === STYLE_GUIDE_HASH,
	);

	useEffect(() => {
		const onHashChange = () => {
			if (window.location.hash === STYLE_GUIDE_HASH) {
				setShowStyleGuide(true);
			}
		};
		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	}, []);

	return showStyleGuide ? <StyleGuidePage /> : <UnderConstructionPage />;
}

export default App;
