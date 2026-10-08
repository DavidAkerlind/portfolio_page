import './backdrop.css';

const orbs = [
	{
		size: 520,
		color: 'var(--color-blue)',
		top: '-120px',
		left: '-100px',
		delay: '0s',
	},
	{
		size: 380,
		color: 'var(--color-lavender)',
		bottom: '-80px',
		right: '-60px',
		delay: '-5s',
	},
	{
		size: 260,
		color: 'var(--color-slate)',
		top: '50%',
		left: '55%',
		delay: '-9s',
	},
];

/* Fixed background layer: noise, drifting blurred orbs and a top accent line.
   Glass surfaces blur what is behind them, so every page renders this once. */
export default function Backdrop() {
	return (
		<div className="backdrop" aria-hidden="true">
			<div className="backdrop-noise" />

			{orbs.map((orb, index) => (
				<div
					key={index}
					className="backdrop-orb"
					style={{
						width: orb.size,
						height: orb.size,
						background: orb.color,
						top: orb.top,
						left: orb.left,
						bottom: orb.bottom,
						right: orb.right,
						animationDelay: orb.delay,
					}}
				/>
			))}

			<div className="backdrop-accent" />
		</div>
	);
}
