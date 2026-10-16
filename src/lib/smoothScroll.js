// A slow, eased glide for links that point at a place on the same page (#projects,
// #top, ...). The browser's own smooth scrolling is quick and linear-ish, and a
// long jump looks like a hop; this one takes longer the further it goes and eases
// in and out, like a swipe. It is the owner's choice that this glide also runs for
// visitors who ask their system for reduced motion: it only happens after a click,
// and any scroll input stops it.

const easeInOutCubic = (t) =>
	t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// 0.9 s for a short hop, up to 1.6 s for the whole page.
const durationFor = (distance) =>
	Math.min(1600, Math.max(900, 500 + Math.abs(distance) * 0.35));

let frame = null;

function stop() {
	if (frame !== null) cancelAnimationFrame(frame);
	frame = null;
}

// `getTop` is asked again on every frame: the sections below the first screen are only
// drawn once they get near (content-visibility), so the page can change height on the
// way and the place being glided to moves with it.
function glideTo(getTop, onDone) {
	stop();
	const from = window.scrollY;
	const distance = getTop() - from;
	if (Math.abs(distance) < 2) return onDone();

	const duration = durationFor(distance);
	const start = performance.now();

	const step = (now) => {
		const progress = Math.min(1, (now - start) / duration);
		// 'instant' so the page's CSS scroll-behavior does not smooth every frame again.
		window.scrollTo({ top: from + (getTop() - from) * easeInOutCubic(progress), behavior: 'instant' });
		if (progress < 1) {
			frame = requestAnimationFrame(step);
		} else {
			frame = null;
			onDone();
		}
	};
	frame = requestAnimationFrame(step);
}

// The first same-page link under the click, or null.
function anchorFrom(event) {
	if (event.defaultPrevented || event.button !== 0) return null;
	if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

	const link = event.target.closest?.('a[href]');
	if (!link || link.target === '_blank' || link.hasAttribute('download')) return null;

	const url = new URL(link.href, window.location.href);
	const samePage =
		url.origin === window.location.origin &&
		url.pathname.replace(/\/+$/, '') === window.location.pathname.replace(/\/+$/, '');
	return samePage && url.hash ? url : null;
}

function onClick(event) {
	const url = anchorFrom(event);
	if (!url) return;

	const id = decodeURIComponent(url.hash.slice(1));
	// #top is the top of the page; it has no element of its own.
	const target = id === '' || id === 'top' ? null : document.getElementById(id);
	if (id !== '' && id !== 'top' && !target) return;

	event.preventDefault();
	const margin = target ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0;
	const getTop = () => {
		const top = target ? target.getBoundingClientRect().top + window.scrollY - margin : 0;
		const maxTop = document.documentElement.scrollHeight - window.innerHeight;
		return Math.max(0, Math.min(top, maxTop));
	};

	glideTo(getTop, () => {
		// Like a normal jump: the address shows the place, and focus moves there so
		// keyboard and screen reader users carry on from it.
		if (window.location.hash !== url.hash) history.pushState(null, '', url.hash);
		if (target) {
			target.setAttribute('tabindex', '-1');
			target.focus({ preventScroll: true });
		}
	});
}

// Any of these means the visitor has taken over, so the glide lets go.
const TAKE_OVER = ['wheel', 'touchstart', 'keydown', 'mousedown'];

export function startSmoothAnchors() {
	document.addEventListener('click', onClick);
	TAKE_OVER.forEach((name) =>
		window.addEventListener(name, stop, { passive: true }),
	);
	return () => {
		stop();
		document.removeEventListener('click', onClick);
		TAKE_OVER.forEach((name) => window.removeEventListener(name, stop));
	};
}
