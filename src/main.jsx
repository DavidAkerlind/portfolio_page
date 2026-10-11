import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Fonts are served from this site (no third-party requests). Only the Latin sets and
// the weights the design uses are loaded; scripts/prerender.mjs preloads the main ones.
import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource/dm-serif-display/latin-400.css';
import '@fontsource/dm-serif-display/latin-400-italic.css';
import '@fontsource/dm-mono/latin-400.css';
import './index.css';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
	<StrictMode>
		<App />
	</StrictMode>
);

// A built page already holds its HTML, so React picks that up. The dev server
// serves an empty root, which is rendered from scratch.
if (root.hasChildNodes()) {
	hydrateRoot(root, app);
} else {
	createRoot(root).render(app);
}
