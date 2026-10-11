import { useId } from 'react';
import './glassLogo.css';

/* A logo as colourless liquid glass. `src` is a silhouette (an image with
   transparency, or an SVG, shown square) and only its shape is used: the glass
   comes from an SVG filter, a faint white body with a bright rim lit from the top
   left, a softer one from the bottom right and a drop shadow around it.
   Decorative: the name of the organisation is always in the text beside it. */
export default function GlassLogo({ src, className = '' }) {
	const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
	const filter = `${uid}-glass`;

	return (
		<svg
			className={`glass-logo ${className}`.trim()}
			viewBox="0 0 100 100"
			aria-hidden="true"
			focusable="false">
			<defs>
				<filter
					id={filter}
					x="-20%"
					y="-20%"
					width="140%"
					height="140%"
					colorInterpolationFilters="sRGB">
					{/* Smooth height maps of the shape: a tight one for the rims and a wide
					    one for the broad sheen across the body. */}
					<feGaussianBlur in="SourceAlpha" stdDeviation="1.3" result="height" />
					<feGaussianBlur in="SourceAlpha" stdDeviation="4" result="soft" />

					<feSpecularLighting
						in="height"
						surfaceScale="3"
						specularConstant="1.6"
						specularExponent="20"
						lightingColor="#fff"
						result="litTopLeft">
						<feDistantLight azimuth="225" elevation="38" />
					</feSpecularLighting>
					<feComposite
						in="litTopLeft"
						in2="SourceAlpha"
						operator="in"
						result="rimTopLeft"
					/>

					<feSpecularLighting
						in="height"
						surfaceScale="3"
						specularConstant="0.6"
						specularExponent="16"
						lightingColor="#fff"
						result="litBottomRight">
						<feDistantLight azimuth="45" elevation="30" />
					</feSpecularLighting>
					<feComposite
						in="litBottomRight"
						in2="SourceAlpha"
						operator="in"
						result="rimBottomRight"
					/>

					<feSpecularLighting
						in="soft"
						surfaceScale="8"
						specularConstant="0.3"
						specularExponent="2.5"
						lightingColor="#fff"
						result="litSheen">
						<feDistantLight azimuth="225" elevation="55" />
					</feSpecularLighting>
					<feComposite in="litSheen" in2="SourceAlpha" operator="in" result="sheen" />

					<feFlood floodColor="#fff" floodOpacity="0.1" />
					<feComposite in2="SourceAlpha" operator="in" result="body" />

					{/* A thin bright line all the way round the edge. */}
					<feMorphology
						in="SourceAlpha"
						operator="erode"
						radius="0.5"
						result="eroded"
					/>
					<feComposite
						in="SourceAlpha"
						in2="eroded"
						operator="out"
						result="edge"
					/>
					<feComponentTransfer in="edge" result="edgeLine">
						<feFuncA type="linear" slope="0.55" />
					</feComponentTransfer>

					{/* The shadow only shows outside the shape, so the glass stays clear. */}
					<feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="shadowBlur" />
					<feOffset in="shadowBlur" dy="2.4" result="shadowOffset" />
					<feFlood floodColor="#020a14" floodOpacity="0.6" />
					<feComposite in2="shadowOffset" operator="in" result="shadowFull" />
					<feComposite
						in="shadowFull"
						in2="SourceAlpha"
						operator="out"
						result="shadow"
					/>

					<feMerge>
						<feMergeNode in="shadow" />
						<feMergeNode in="body" />
						<feMergeNode in="sheen" />
						<feMergeNode in="edgeLine" />
						<feMergeNode in="rimBottomRight" />
						<feMergeNode in="rimTopLeft" />
					</feMerge>
				</filter>
			</defs>

			<image href={src} width="100" height="100" filter={`url(#${filter})`} />
		</svg>
	);
}
