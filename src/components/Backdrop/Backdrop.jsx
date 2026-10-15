import { useEffect, useRef } from 'react';
import './backdrop.css';

// Where each glow sits. `top` is a share (0 to 1) of the stretch of backdrop that
// can ever be seen, so the glows stay spread out down the whole page on any screen
// size; `dy` nudges one by some pixels. `left` / `right` are offsets from the edge
// (negative ones push a glow partly off-screen).
const orbs = [
	{ size: 520, color: 'var(--glow-blue)', top: 0, dy: -120, left: '-100px' },
	{ size: 380, color: 'var(--glow-lavender)', top: 0.06, right: '-80px' },
	{ size: 460, color: 'var(--glow-blue)', top: 0.2, left: '-140px' },
	{ size: 340, color: 'var(--glow-lavender)', top: 0.31, right: '-100px' },
	{ size: 300, color: 'var(--glow-slate)', top: 0.42, left: '38%' },
	{ size: 500, color: 'var(--glow-blue)', top: 0.52, right: '-140px' },
	{ size: 400, color: 'var(--glow-lavender)', top: 0.64, left: '-120px' },
	{ size: 420, color: 'var(--glow-blue)', top: 0.76, right: '-100px' },
	{ size: 360, color: 'var(--glow-lavender)', top: 0.88, left: '-80px' },
	{ size: 300, color: 'var(--glow-slate)', top: 0.95, right: '10%' },
];

/* Background layer behind the whole page: noise, soft glows and a top accent
   line. It is as tall as the page but drifts slower than the page scrolls (see
   --parallax in backdrop.css), so it feels far away. Browsers with scroll-driven
   animations do that in CSS alone; for the others the effect below moves the layer
   in the same way. Glass surfaces blur what is behind them, so every page renders
   this once. */
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

			{orbs.map(({ size, color, top, dy = 0, left, right }, index) => (
				<div
					key={index}
					className="backdrop-orb"
					style={{
						'--orb-size': `${size}px`,
						'--orb-color': color,
						'--p': top,
						'--dy': `${dy}px`,
						left,
						right,
						animationDelay: `${-(index * 3) % 9}s`,
					}}
				/>
			))}

			<div className="backdrop-accent" />
		</div>
	);
}
