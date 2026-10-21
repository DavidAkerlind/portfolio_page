import { useCallback, useEffect, useRef, useState } from 'react';

// How long a click on a nav link keeps the highlight where the visitor sent it: the
// page glides past the sections in between, which must not light up on the way.
const HOLD = 1700;

/* The index of the section (by element id) the visitor is reading, or -1 above the
   first one: the last section whose top has passed 40% of the way down the screen,
   and the last one when the page is scrolled to the end. `choose(index)` sets it
   by hand, for a click. Only runs in the browser. */
export function useActiveSection(ids) {
	const [active, setActive] = useState(-1);
	const holdUntil = useRef(0);
	const key = ids.join('|');

	useEffect(() => {
		const list = key ? key.split('|') : [];
		let frame = 0;
		let timer = 0;

		const measure = () => {
			frame = 0;
			if (performance.now() < holdUntil.current) return;
			const line = window.innerHeight * 0.4;
			const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
			let found = -1;
			list.forEach((id, index) => {
				const element = document.getElementById(id);
				if (element && element.getBoundingClientRect().top <= line) found = index;
			});
			setActive(atEnd && list.length && document.getElementById(list[list.length - 1]) ? list.length - 1 : found);
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(measure);
		};
		// Taking over the scroll ends the hold at once.
		const release = () => {
			holdUntil.current = 0;
			schedule();
		};
		const afterHold = () => {
			timer = window.setTimeout(schedule, Math.max(0, holdUntil.current - performance.now()) + 50);
		};

		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		['wheel', 'touchstart', 'keydown'].forEach((name) =>
			window.addEventListener(name, release, { passive: true }),
		);
		window.addEventListener('hold-section', afterHold);
		schedule();

		return () => {
			cancelAnimationFrame(frame);
			window.clearTimeout(timer);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			['wheel', 'touchstart', 'keydown'].forEach((name) => window.removeEventListener(name, release));
			window.removeEventListener('hold-section', afterHold);
		};
	}, [key]);

	const choose = useCallback((index) => {
		holdUntil.current = performance.now() + HOLD;
		setActive(index);
		window.dispatchEvent(new Event('hold-section'));
	}, []);

	return [active, choose];
}
