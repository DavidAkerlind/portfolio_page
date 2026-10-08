import './glassCard.css';

/* The glass surface: translucent fill, blur, hairline border, soft shadow.
   `interactive` brightens the border on hover; `padded` adds the card padding. */
export default function GlassCard({
	as = 'div',
	interactive = false,
	padded = true,
	className = '',
	children,
	...props
}) {
	const Element = as;
	const classes = [
		'glass-card',
		interactive && 'glass-card-interactive',
		padded && 'glass-card-padded',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<Element className={classes} {...props}>
			{children}
		</Element>
	);
}
