import './button.css';

/* A pill-shaped button. With `href` it renders a link (external links open in a
   new tab); without it, a <button>. Variants: 'primary' (filled) or 'secondary' (glass). */
export default function Button({
	href,
	variant = 'primary',
	className = '',
	children,
	...props
}) {
	const classes = `button button-${variant} ${className}`.trim();

	if (href) {
		const isExternal = /^https?:/.test(href);

		return (
			<a
				href={href}
				className={classes}
				target={isExternal ? '_blank' : undefined}
				rel={isExternal ? 'noopener noreferrer' : undefined}
				{...props}>
				{children}
			</a>
		);
	}

	return (
		<button type="button" className={classes} {...props}>
			{children}
		</button>
	);
}
