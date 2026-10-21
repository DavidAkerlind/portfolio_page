import { useSyncExternalStore } from 'react';

const LIGHT = '(prefers-color-scheme: light)';

// The theme the page is showing: the one chosen with the switch (data-theme on
// <html>), or else the device's. 'dark' while rendering on the server.
function subscribe(onChange) {
	const query = window.matchMedia(LIGHT);
	query.addEventListener('change', onChange);
	const observer = new MutationObserver(onChange);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
	return () => {
		query.removeEventListener('change', onChange);
		observer.disconnect();
	};
}

function current() {
	const chosen = document.documentElement.dataset.theme;
	if (chosen === 'light' || chosen === 'dark') return chosen;
	return window.matchMedia(LIGHT).matches ? 'light' : 'dark';
}

export function useSiteTheme() {
	return useSyncExternalStore(subscribe, current, () => 'dark');
}
