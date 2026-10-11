import { useId } from 'react';
import GlassCard from '../GlassCard/GlassCard';
import './timerDisplay.css';

/* An LED scoreboard timer drawn in SVG: every digit is a grid of round dots, each
   one a small bead of red liquid glass with a bright rim and a soft highlight.
   Dots that are off stay as dark glass. There is deliberately no glow.
   Pass the time as text: '04:09' or '04:09:12'. */

const COLS = 8; // dots across one digit
const ROWS = 16; // dots down one digit
const RADIUS = 0.33; // bead radius, in dot pitches (the distance between two dots)
const GAP = 2.4; // space between characters, in dot pitches
const SLANT = 0.12; // how far each row leans right, in dot pitches
const COLON_COLS = 2;
const COLON_ROWS = [4, 5, 10, 11];

const range = (from, to) =>
	Array.from({ length: to - from + 1 }, (_, index) => from + index);
const block = (cols, rows) =>
	rows.flatMap((row) => cols.map((col) => `${col},${row}`));

// Each segment is a strip two dots wide. Neighbouring segments share their corners.
const SEGMENTS = {
	a: block(range(1, 6), [0, 1]),
	b: block([6, 7], range(1, 7)),
	c: block([6, 7], range(8, 14)),
	d: block(range(1, 6), [14, 15]),
	e: block([0, 1], range(8, 14)),
	f: block([0, 1], range(1, 7)),
	g: block(range(1, 6), [7, 8]),
};

const ALL_DOTS = [...new Set(Object.values(SEGMENTS).flat())];

const DIGITS = {
	0: 'abcdef',
	1: 'bc',
	2: 'abged',
	3: 'abgcd',
	4: 'fgbc',
	5: 'afgcd',
	6: 'afgecd',
	7: 'abc',
	8: 'abcdefg',
	9: 'abcdfg',
};

// Centre of the dot at (col, row) for a character starting at x.
const place = (x, col, row) => ({ x: x + col + (ROWS - 1 - row) * SLANT, y: row });

function buildDots(time) {
	const lit = [];
	const unlit = [];
	let x = 0;

	[...time].forEach((char, index) => {
		if (char === ':') {
			COLON_ROWS.forEach((row) => {
				range(0, COLON_COLS - 1).forEach((col) => {
					lit.push({ key: `${index}-${col},${row}`, ...place(x, col, row) });
				});
			});
			x += COLON_COLS - 1 + GAP;
		} else if (Object.hasOwn(DIGITS, char)) {
			const on = new Set(
				[...DIGITS[char]].flatMap((segment) => SEGMENTS[segment]),
			);
			ALL_DOTS.forEach((dot) => {
				const [col, row] = dot.split(',').map(Number);
				const target = on.has(dot) ? lit : unlit;
				target.push({ key: `${index}-${dot}`, ...place(x, col, row) });
			});
			x += COLS - 1 + GAP;
		}
	});

	return { lit, unlit, width: x - GAP + (ROWS - 1) * SLANT };
}

export default function TimerDisplay({ time, label, caption, ariaLabel }) {
	const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
	const { lit, unlit, width } = buildDots(time);

	const pad = RADIUS + 0.1;
	const viewWidth = width + pad * 2;
	const viewHeight = ROWS - 1 + pad * 2;

	return (
		<GlassCard as="figure" className="timer">
			{label && <figcaption className="timer-label">{label}</figcaption>}

			<div className="timer-screen">
				<svg
					className="timer-svg"
					viewBox={`${-pad} ${-pad} ${viewWidth} ${viewHeight}`}
					style={{ '--timer-ratio': viewWidth / viewHeight }}
					role="img"
					aria-label={ariaLabel ?? time}
					focusable="false">
					<defs>
						{/* The bead: red glass, lighter towards the top-left. */}
						<radialGradient id={`${uid}-bead`} cx="0.36" cy="0.32" r="0.8">
							<stop offset="0" style={{ stopColor: 'var(--color-timer-light)' }} />
							<stop offset="0.5" style={{ stopColor: 'var(--color-timer)' }} />
							<stop offset="1" style={{ stopColor: 'var(--color-timer-deep)' }} />
						</radialGradient>

						{/* A bright rim on the top-left edge, a faint reflected one opposite. */}
						<linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="1">
							<stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
							<stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
							<stop offset="0.75" stopColor="#ffb3ac" stopOpacity="0" />
							<stop offset="1" stopColor="#ffb3ac" stopOpacity="0.4" />
						</linearGradient>

						<g id={`${uid}-on`}>
							<circle r={RADIUS} fill={`url(#${uid}-bead)`} fillOpacity="0.96" />
							<circle
								r={RADIUS * 0.92}
								fill="none"
								stroke={`url(#${uid}-rim)`}
								strokeWidth={RADIUS * 0.17}
							/>
							<ellipse
								cx={-RADIUS * 0.33}
								cy={-RADIUS * 0.4}
								rx={RADIUS * 0.38}
								ry={RADIUS * 0.21}
								transform={`rotate(-38 ${-RADIUS * 0.33} ${-RADIUS * 0.4})`}
								fill="#ffffff"
								fillOpacity="0.45"
							/>
						</g>

						<circle id={`${uid}-off`} className="timer-off" r={RADIUS} />
					</defs>

					{unlit.map(({ key, x, y }) => (
						<use key={key} href={`#${uid}-off`} x={x} y={y} />
					))}
					{lit.map(({ key, x, y }) => (
						<use key={key} href={`#${uid}-on`} x={x} y={y} />
					))}
				</svg>
			</div>

			{caption && <p className="timer-caption">{caption}</p>}
		</GlassCard>
	);
}
