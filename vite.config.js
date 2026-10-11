import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
	plugins: [react()],
	base: '/',
	build: {
		rollupOptions: {
			output: {
				// React rarely changes, so it gets its own file: visitors who come back
				// after a new deploy keep it cached and only fetch the site's own code.
				manualChunks: isSsrBuild
					? undefined
					: (id) => (/node_modules\/(react|react-dom|scheduler)\//.test(id) ? 'react' : undefined),
			},
		},
	},
}));
