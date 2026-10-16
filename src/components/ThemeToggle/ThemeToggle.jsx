import { useSyncExternalStore } from 'react';
import { useUi } from '../../i18n/lang';
import './themeToggle.css';

const LIGHT = '(prefers-color-scheme: light)';
const META_COLOR = { light: '#eef1f7', dark: '#0f1e30' };

// The switch picks a theme by setting data-theme on <html> (index.html applies the
// saved one before the first paint). Until it is pressed, the device decides.
const listeners = new Set();

function subscribe(onChange) {
	listeners.add(onChange);
	const query = window.matchMedia(LIGHT);
	query.addEventListener('change', onChange);
	return () => {
		listeners.delete(onChange);
		query.removeEventListener('change', onChange);
	};
}

function currentTheme() {
	const chosen = document.documentElement.dataset.theme;
	if (chosen === 'light' || chosen === 'dark') return chosen;
	return window.matchMedia(LIGHT).matches ? 'light' : 'dark';
}

function apply(theme) {
	document.documentElement.dataset.theme = theme;
	document
		.querySelectorAll('meta[name="theme-color"]')
		.forEach((meta) => (meta.content = META_COLOR[theme]));
	listeners.forEach((onChange) => onChange());
}

function choose(theme) {
	try {
		localStorage.setItem('theme', theme);
	} catch {
		// Storage can be blocked; the choice then lasts until the page closes.
	}

	// Fade between the two looks instead of snapping.
	if (document.startViewTransition) {
		document.startViewTransition(() => apply(theme));
		return;
	}
	const root = document.documentElement;
	root.classList.add('theme-fading');
	apply(theme);
	setTimeout(() => root.classList.remove('theme-fading'), 550);
}

/* Round glass button that switches between light and dark mode. Both icons are in
   the markup and the CSS shows the right one, so nothing flashes while the page
   loads; the theme itself is only read in the browser (null while rendering on the
   server and hydrating). */
export default function ThemeToggle() {
	const ui = useUi().theme;
	const theme = useSyncExternalStore(subscribe, currentTheme, () => null);
	const label =
		theme === 'light' ? ui.toDark : theme === 'dark' ? ui.toLight : ui.toggle;

	return (
		<button
			type="button"
			className="theme-toggle"
			aria-label={label}
			title={label}
			onClick={() => choose(theme === 'light' ? 'dark' : 'light')}>
			<svg
				className="theme-toggle-sun"
				viewBox="0 0 20 20"
				width="18"
				height="18"
				aria-hidden="true"
				focusable="false">
				<circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
				<path
					d="M10 2.2v2M10 15.8v2M2.2 10h2M15.8 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
				/>
			</svg>
			<svg
				className="theme-toggle-moon"
				viewBox="0 0 20 20"
				width="18"
				height="18"
				aria-hidden="true"
				focusable="false">
				<path
					d="M16.4 12.2A6.8 6.8 0 0 1 7.8 3.6a6.8 6.8 0 1 0 8.6 8.6z"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
}
