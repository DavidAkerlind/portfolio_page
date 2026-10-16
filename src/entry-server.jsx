import { prerender } from 'react-dom/static';
import App from './App.jsx';

// Used only at build time: returns the HTML of the page at `path`, with every
// lazy piece resolved. scripts/prerender.mjs puts it into the built index.html.
export async function render(path) {
	const { prelude } = await prerender(<App path={path} />);
	return new Response(prelude).text();
}
