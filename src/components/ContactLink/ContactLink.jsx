import GlassCard from '../GlassCard/GlassCard';
import './contactLink.css';

// Simple one-colour marks. They take the text colour, so they stay inside the palette.
const icons = {
	mail: {
		viewBox: '0 0 24 24',
		path: 'M4 4.5h16a1.5 1.5 0 0 1 .9 2.7l-8 5.9a1.6 1.6 0 0 1-1.8 0l-8-5.9A1.5 1.5 0 0 1 4 4.5zM2 10.2l8.3 6.1a3.2 3.2 0 0 0 3.4 0L22 10.2v7.3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z',
	},
	github: {
		viewBox: '0 0 16 16',
		path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
	},
	linkedin: {
		viewBox: '0 0 24 24',
		path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z',
	},
};

/* A whole-card link to somewhere David can be reached: an icon, a small label
   (Email, GitHub, ...) and the address or handle. `icon` is 'mail', 'github' or
   'linkedin'. Links to other sites open in a new tab. */
export default function ContactLink({ href, icon, label, value, className = '' }) {
	const mark = icons[icon];
	const isExternal = /^https?:/.test(href);

	return (
		<GlassCard
			as="a"
			interactive
			padded={false}
			href={href}
			className={`contact-link ${className}`.trim()}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noopener noreferrer' : undefined}>
			<span className="contact-link-icon">
				<svg
					viewBox={mark.viewBox}
					width="20"
					height="20"
					fill="currentColor"
					aria-hidden="true"
					focusable="false">
					<path d={mark.path} />
				</svg>
			</span>

			<span className="contact-link-text">
				<span className="contact-link-label">{label}</span>
				<span className="contact-link-value">{value}</span>
			</span>

			<svg
				className="contact-link-arrow"
				viewBox="0 0 24 24"
				width="18"
				height="18"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				focusable="false">
				<path d="M7 17 17 7M8.5 7H17v8.5" />
			</svg>
		</GlassCard>
	);
}
