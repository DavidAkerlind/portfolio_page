import { useEffect, useRef } from 'react';
import './backdrop.css';

/* Background layer behind the whole page: noise and a top accent line. It is as
   tall as the page but drifts slower than the page scrolls (see --parallax in
   backdrop.css), so it feels far away. Browsers with scroll-driven animations do
   that in CSS alone; for the others the effect below moves the layer in the same
   way. Glass surfaces blur what is behind them, so every page renders this once. */
export default function Backdrop() {
	const layer = useRef(null);

	useEffect(() => {
		if (CSS.supports('animation-timeline', 'scroll()')) return;

		const el = layer.current;
		const behind = 1 - parseFloat(getComputedStyle(el).getPropertyValue('--parallax'));
		let frame = 0;

		const update = () => {
			frame = 0;
			el.style.transform = `translate3d(0, ${behind * window.scrollY}px, 0)`;
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		el.classList.add('backdrop-scripted');
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(frame);
			el.classList.remove('backdrop-scripted');
			el.style.transform = '';
		};
	}, []);

	return (
		<div className="backdrop" ref={layer} aria-hidden="true">
			<div className="backdrop-noise" />
			<div className="backdrop-accent" />
		</div>
	);
}
