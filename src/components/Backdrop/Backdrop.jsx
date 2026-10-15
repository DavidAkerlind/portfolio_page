import './backdrop.css';

// Where each glow sits. `top` is a share of the page height, so the glows stay
// spread out down the whole page on any screen size, and `left` / `right` are
// offsets from the edge (negative ones push a glow partly off-screen).
const orbs = [
	{ size: 520, color: 'var(--glow-blue)', top: '-120px', left: '-100px' },
	{ size: 380, color: 'var(--glow-lavender)', top: '6%', right: '-80px' },
	{ size: 460, color: 'var(--glow-blue)', top: '20%', left: '-140px' },
	{ size: 340, color: 'var(--glow-lavender)', top: '31%', right: '-100px' },
	{ size: 300, color: 'var(--glow-slate)', top: '42%', left: '38%' },
	{ size: 500, color: 'var(--glow-blue)', top: '52%', right: '-140px' },
	{ size: 400, color: 'var(--glow-lavender)', top: '64%', left: '-120px' },
	{ size: 420, color: 'var(--glow-blue)', top: '76%', right: '-100px' },
	{ size: 360, color: 'var(--glow-lavender)', top: '88%', left: '-80px' },
	{ size: 300, color: 'var(--glow-slate)', top: '95%', right: '10%' },
];

/* Background layer behind the whole page: noise, soft glows and a top accent
   line. It is as tall as the page and scrolls with it, so each glow stays where
   it is placed. Glass surfaces blur what is behind them, so every page renders
   this once. */
export default function Backdrop() {
	return (
		<div className="backdrop" aria-hidden="true">
			<div className="backdrop-noise" />

			{orbs.map(({ size, color, top, left, right }, index) => (
				<div
					key={index}
					className="backdrop-orb"
					style={{
						'--orb-size': `${size}px`,
						'--orb-color': color,
						top,
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
