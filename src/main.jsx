import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
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
