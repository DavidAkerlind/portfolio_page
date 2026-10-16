import { useId, useMemo } from 'react';
import GlassCard from '../GlassCard/GlassCard';
import './timerDisplay.css';

/* An LED scoreboard timer drawn in SVG: every digit is a grid of round dots, each
   one a small bead of red liquid glass with a bright rim and a soft highlight.
   Dots that are off stay as dark glass. There is deliberately no glow.
   Pass the time as text: '04:09' or '04:09:12'. A '-' is a digit with every dot off.

   A timer has a few hundred dots, so every part of the bead is one path for the whole
   display, not an element per dot (which was about a thousand elements and made the
   page slow to draw). A round dot is a zero-length line with a round cap, so the
   bead's shading is a stack of copies of one path of dots (a <use> each), every copy
   a smaller and lighter circle moved towards the top-left. The rim is the same trick
   with a path of circles, dashed so that only an arc of each shows, and the highlight
   is a small light dot. */

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
		} else if (char === '-') {
			ALL_DOTS.forEach((dot) => {
				const [col, row] = dot.split(',').map(Number);
				unlit.push({ key: `${index}-${dot}`, ...place(x, col, row) });
			});
			x += COLS - 1 + GAP;
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

// One path made of a small circle for every dot.
const round = (value) => Math.round(value * 1000) / 1000;
const circles = (dots) =>
	dots
		.map(
			({ x, y }) =>
				`M${round(x - RADIUS)} ${round(y)}a${RADIUS} ${RADIUS} 0 1 0 ${2 * RADIUS} 0a${RADIUS} ${RADIUS} 0 1 0 ${-2 * RADIUS} 0`,
		)
		.join('');

// A dot drawn as a line of no length: the round cap makes the disc.
const discs = (dots) => dots.map(({ x, y }) => `M${round(x)} ${round(y)}h.001`).join('');

// The shading: copies of the discs from the whole bead (darkest) down to a small one
// (lightest), as a share of the bead's radius. Their colours are the .timer-bead-*
// classes. The smaller the copy, the further it is moved up and to the left, towards
// the light (at most this far, in dot pitches).
const SHADES = [1, 0.86, 0.72, 0.58, 0.44, 0.3];
const LIGHT_SOURCE = { x: -0.61 * 0.15, y: -0.79 * 0.15 };

// The rim: a circle around every bead that starts at RIM_START degrees (0 is to the
// right, 90 straight down, 225 up and to the left) and runs clockwise. Dashing shows
// one arc of each: it starts `from` degrees and is `extent` degrees long.
const RIM_RADIUS = RADIUS * 0.92;
const RIM_START = -5;
const RIM_LENGTH = 2 * Math.PI * RIM_RADIUS;
const rimCircles = (dots) => {
	const radians = (RIM_START * Math.PI) / 180;
	const dx = round(RIM_RADIUS * Math.cos(radians));
	const dy = round(RIM_RADIUS * Math.sin(radians));
	const half = `a${round(RIM_RADIUS)} ${round(RIM_RADIUS)} 0 1 1`;
	return dots
		.map(({ x, y }) => `M${round(x + dx)} ${round(y + dy)}${half} ${-2 * dx} ${-2 * dy}${half} ${2 * dx} ${2 * dy}`)
		.join('');
};
const rimArc = (from, extent, color, opacity) => {
	const length = (extent / 360) * RIM_LENGTH;
	const start = ((from - RIM_START) / 360) * RIM_LENGTH;
	return {
		color,
		opacity,
		dash: `${round(length)} ${round(RIM_LENGTH - length)}`,
		offset: round(start === 0 ? 0 : RIM_LENGTH - start),
	};
};
const RIM_ARCS = [
	rimArc(135, 180, '#ffffff', 0.24), // a wide, faint one up and to the left
	rimArc(180, 90, '#ffffff', 0.3), // and a narrower one on top of it, so it is brightest there
	rimArc(-5, 100, '#ffb3ac', 0.28), // the faint reflection down and to the right
];

// The highlight: a small light dot near the top-left of every bead.
const HIGHLIGHT = { x: -RADIUS * 0.33, y: -RADIUS * 0.4, size: RADIUS * 0.6 };

const translate = (x, y) => `translate(${round(x)} ${round(y)})`;

function buildTimer(time) {
	const { lit, unlit, width } = buildDots(time);
	return { width, off: circles(unlit), discs: discs(lit), rim: rimCircles(lit) };
}

export default function TimerDisplay({ time, label, caption, ariaLabel }) {
	const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
	const timer = useMemo(() => buildTimer(time), [time]);

	const pad = RADIUS + 0.1;
	const viewWidth = timer.width + pad * 2;
	const viewHeight = ROWS - 1 + pad * 2;

	return (
		<GlassCard as="figure" padded={false} className="timer">
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
						<path id={`${uid}-discs`} d={timer.discs} />
						<path id={`${uid}-rim`} d={timer.rim} />
					</defs>

					{/* The dots that are off: dark glass. */}
					<path className="timer-off" d={timer.off} />

					{/* The beads that are lit, from the darkest layer to the lightest. */}
					{SHADES.map((share, index) => {
						const move = (1 - share) / 0.7;
						return (
							<use
								key={share}
								href={`#${uid}-discs`}
								className={`timer-bead timer-bead-${index}`}
								transform={translate(LIGHT_SOURCE.x * move, LIGHT_SOURCE.y * move)}
								strokeWidth={round(2 * RADIUS * share)}
							/>
						);
					})}

					{/* A bright rim on the top-left edge, a faint reflected one opposite. */}
					{RIM_ARCS.map(({ color, opacity, dash, offset }) => (
						<use
							key={dash + color}
							href={`#${uid}-rim`}
							className="timer-bead"
							stroke={color}
							strokeOpacity={opacity}
							strokeWidth={round(RADIUS * 0.17)}
							strokeDasharray={dash}
							strokeDashoffset={offset}
						/>
					))}

					<use
						href={`#${uid}-discs`}
						className="timer-bead"
						transform={translate(HIGHLIGHT.x, HIGHLIGHT.y)}
						stroke="#ffffff"
						strokeOpacity="0.6"
						strokeWidth={round(HIGHLIGHT.size)}
					/>
				</svg>
			</div>

			{caption && <p className="timer-caption">{caption}</p>}
		</GlassCard>
	);
}
