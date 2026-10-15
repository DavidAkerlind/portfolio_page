import { useEffect, useRef } from 'react';
import './backdrop.css';

// Where each glow sits and how it floats. `top` is a share (0 to 1) of the stretch of
// backdrop that can ever be seen, so the glows stay spread out down the whole page on
// any screen size; `dy` nudges one by some pixels. `left` / `right` are offsets from
// the edge (negative ones push a glow partly off-screen). `sway` and `bob` are how far
// (px) and how slowly (s) it drifts sideways and up and down, and `swell` is the size
// it breathes between. All different, so the glows never move in step.
const orbs = [
	{ size: 520, color: 'var(--glow-blue)', top: 0, dy: -120, left: '-100px', sway: [140, 46], bob: [90, 38], swell: [0.95, 1.1] },
	{ size: 380, color: 'var(--glow-lavender)', top: 0.06, right: '-80px', sway: [110, 38], bob: [120, 52], swell: [0.92, 1.08] },
	{ size: 460, color: 'var(--glow-blue)', top: 0.2, left: '-140px', sway: [160, 54], bob: [80, 34], swell: [1, 1.15] },
	{ size: 340, color: 'var(--glow-lavender)', top: 0.31, right: '-100px', sway: [90, 32], bob: [110, 44], swell: [0.9, 1.05] },
	{ size: 300, color: 'var(--glow-slate)', top: 0.42, left: '38%', sway: [120, 42], bob: [140, 58], swell: [0.95, 1.12] },
	{ size: 500, color: 'var(--glow-blue)', top: 0.52, right: '-140px', sway: [150, 50], bob: [100, 36], swell: [0.92, 1.1] },
	{ size: 400, color: 'var(--glow-lavender)', top: 0.64, left: '-120px', sway: [100, 36], bob: [130, 48], swell: [1, 1.12] },
	{ size: 420, color: 'var(--glow-blue)', top: 0.76, right: '-100px', sway: [130, 44], bob: [90, 40], swell: [0.94, 1.08] },
	{ size: 360, color: 'var(--glow-lavender)', top: 0.88, left: '-80px', sway: [110, 30], bob: [120, 54], swell: [0.9, 1.1] },
	{ size: 300, color: 'var(--glow-slate)', top: 0.95, right: '10%', sway: [90, 40], bob: [100, 46], swell: [0.96, 1.14] },
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

			{orbs.map(({ size, color, top, dy = 0, left, right, sway, bob, swell }, index) => (
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
						'--sway': `${sway[0]}px`,
						'--sway-time': `${sway[1]}s`,
						'--bob': `${bob[0]}px`,
						'--bob-time': `${bob[1]}s`,
						'--swell-from': swell[0],
						'--swell-to': swell[1],
						// Start each one somewhere else along its path.
						animationDelay: `${-((index * 11) % 47)}s, ${-((index * 17) % 53)}s`,
					}}
				/>
			))}

			<div className="backdrop-accent" />
		</div>
	);
}
