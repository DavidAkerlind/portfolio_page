import { useId } from 'react';
import GlassCard from '../GlassCard/GlassCard';
import './timerDisplay.css';

/* A seven-segment timer drawn in SVG, finished as red liquid glass: lit segments
   have a soft bevel and bright rims on their edges, unlit ones stay dark glass.
   There is deliberately no glow. Pass the time as text: '04:09' or '04:09:12'. */

const WIDTH = 56; // width of one digit
const HEIGHT = 100; // height of one digit
const THICKNESS = 11; // thickness of a segment
const GAP = 1.8; // gap between neighbouring segments
const SPACING = 10; // space between characters
const COLON_WIDTH = THICKNESS;

const HALF = THICKNESS / 2;
const MID = HEIGHT / 2;

// A horizontal bar with pointed ends, centred on the line y.
function horizontal(y) {
	const left = HALF + GAP;
	const right = WIDTH - HALF - GAP;
	return [
		[left, y],
		[left + HALF, y - HALF],
		[right - HALF, y - HALF],
		[right, y],
		[right - HALF, y + HALF],
		[left + HALF, y + HALF],
	];
}

// A vertical bar with pointed ends, centred on the line x.
function vertical(x, top, bottom) {
	return [
		[x, top],
		[x + HALF, top + HALF],
		[x + HALF, bottom - HALF],
		[x, bottom],
		[x - HALF, bottom - HALF],
		[x - HALF, top + HALF],
	];
}

const SEGMENTS = {
	a: horizontal(HALF),
	b: vertical(WIDTH - HALF, HALF + GAP, MID - GAP),
	c: vertical(WIDTH - HALF, MID + GAP, HEIGHT - HALF - GAP),
	d: horizontal(HEIGHT - HALF),
	e: vertical(HALF, MID + GAP, HEIGHT - HALF - GAP),
	f: vertical(HALF, HALF + GAP, MID - GAP),
	g: horizontal(MID),
};

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

const COLON_DOTS = [0.3, 0.7].map((fraction) => {
	const x = COLON_WIDTH / 2;
	const y = HEIGHT * fraction;
	return [
		[x - HALF, y - HALF],
		[x + HALF, y - HALF],
		[x + HALF, y + HALF],
		[x - HALF, y + HALF],
	];
});

function buildGlyphs(time) {
	const lit = [];
	const unlit = [];
	let x = 0;

	[...time].forEach((char, index) => {
		if (char === ':') {
			COLON_DOTS.forEach((points, dot) => {
				lit.push({ key: `${index}-${dot}`, x, points });
			});
			x += COLON_WIDTH + SPACING;
		} else if (Object.hasOwn(DIGITS, char)) {
			Object.entries(SEGMENTS).forEach(([name, points]) => {
				const target = DIGITS[char].includes(name) ? lit : unlit;
				target.push({ key: `${index}-${name}`, x, points });
			});
			x += WIDTH + SPACING;
		}
	});

	return { lit, unlit, width: x - SPACING };
}

const toPoints = (points) => points.map((point) => point.join(',')).join(' ');

export default function TimerDisplay({ time, label, caption, ariaLabel }) {
	const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
	const { lit, unlit, width } = buildGlyphs(time);

	return (
		<GlassCard as="figure" className="timer">
			{label && <figcaption className="timer-label">{label}</figcaption>}

			<div className="timer-screen">
				<svg
					className="timer-svg"
					viewBox={`0 0 ${width} ${HEIGHT}`}
					role="img"
					aria-label={ariaLabel ?? time}
					focusable="false">
					<defs>
						<linearGradient id={`${uid}-base`} x1="0" y1="0" x2="1" y2="1">
							<stop
								offset="0"
								style={{ stopColor: 'var(--color-timer-light)' }}
							/>
							<stop
								offset="0.5"
								style={{ stopColor: 'var(--color-timer)' }}
							/>
							<stop
								offset="1"
								style={{ stopColor: 'var(--color-timer-deep)' }}
							/>
						</linearGradient>

						<linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
							<stop offset="0.45" stopColor="#ffffff" stopOpacity="0.03" />
							<stop offset="1" stopColor="#ffffff" stopOpacity="0" />
						</linearGradient>

						{/* Liquid glass edges: a soft bevel lit from the top-left, a bright
						    rim on the top-left edges and a faint reflected rim opposite.
						    Every layer is clipped to the segment, so nothing spills out. */}
						<filter
							id={`${uid}-glass`}
							x="-2%"
							y="-2%"
							width="104%"
							height="104%"
							colorInterpolationFilters="sRGB">
							<feGaussianBlur in="SourceAlpha" stdDeviation="1" result="soft" />
							<feSpecularLighting
								in="soft"
								surfaceScale="3.5"
								specularConstant="0.4"
								specularExponent="22"
								lightingColor="#ffffff"
								result="spec">
								<feDistantLight azimuth="225" elevation="42" />
							</feSpecularLighting>
							<feComposite
								in="spec"
								in2="SourceAlpha"
								operator="in"
								result="bevel"
							/>

							<feOffset in="SourceAlpha" dx="1" dy="1" result="shiftedLight" />
							<feComposite
								in="SourceAlpha"
								in2="shiftedLight"
								operator="out"
								result="lightEdge"
							/>
							<feFlood floodColor="#ffffff" floodOpacity="0.55" />
							<feComposite in2="lightEdge" operator="in" result="lightRim" />

							<feOffset in="SourceAlpha" dx="-0.8" dy="-0.8" result="shiftedDark" />
							<feComposite
								in="SourceAlpha"
								in2="shiftedDark"
								operator="out"
								result="darkEdge"
							/>
							<feFlood floodColor="#ffb3ac" floodOpacity="0.22" />
							<feComposite in2="darkEdge" operator="in" result="darkRim" />

							<feMerge>
								<feMergeNode in="SourceGraphic" />
								<feMergeNode in="bevel" />
								<feMergeNode in="lightRim" />
								<feMergeNode in="darkRim" />
							</feMerge>
						</filter>
					</defs>

					<g className="timer-unlit">
						{unlit.map(({ key, x, points }) => (
							<polygon
								key={key}
								points={toPoints(points)}
								transform={`translate(${x} 0)`}
							/>
						))}
					</g>

					<g filter={`url(#${uid}-glass)`}>
						{lit.map(({ key, x, points }) => (
							<g key={key} transform={`translate(${x} 0)`}>
								<polygon
									points={toPoints(points)}
									fill={`url(#${uid}-base)`}
									fillOpacity="0.96"
								/>
								<polygon
									points={toPoints(points)}
									fill={`url(#${uid}-sheen)`}
								/>
							</g>
						))}
					</g>
				</svg>
			</div>

			{caption && <p className="timer-caption">{caption}</p>}
		</GlassCard>
	);
}
