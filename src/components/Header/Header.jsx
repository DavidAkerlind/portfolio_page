import { useEffect, useRef, useState } from 'react';
import GlassCard from '../GlassCard/GlassCard';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useUi } from '../../i18n/lang';
import './header.css';

/* Sticky glass bar with the name and the main navigation, and the light and dark
   mode switch. On small screens the links collapse behind a Menu button and drop
   down as their own glass panel, laid over the page so nothing below moves. The
   bar's glass is a separate layer: a glass panel inside another glass surface
   would only blur the bar, not the page behind it. */
export default function Header() {
	const ui = useUi().header;
	const [open, setOpen] = useState(false);
	const barRef = useRef(null);
	const close = () => setOpen(false);

	/* An open menu closes on Escape and on a tap anywhere outside the bar. */
	useEffect(() => {
		if (!open) return undefined;
		const onKey = (event) => event.key === 'Escape' && setOpen(false);
		const onPointer = (event) => {
			if (!barRef.current?.contains(event.target)) setOpen(false);
		};
		document.addEventListener('keydown', onKey);
		document.addEventListener('pointerdown', onPointer);
		return () => {
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('pointerdown', onPointer);
		};
	}, [open]);

	return (
		<header className="site-header">
			<div className="container">
				<div className="site-header-bar" ref={barRef}>
					<GlassCard padded={false} className="site-header-glass" aria-hidden="true" />

					<a href="#top" className="site-header-brand" onClick={close}>
						David <em>Åkerlind</em>
					</a>

					<div className="site-header-controls">
						<ThemeToggle />

						<button
							type="button"
							className="site-header-toggle"
							aria-expanded={open}
							aria-controls="site-nav"
							onClick={() => setOpen(!open)}>
							{open ? ui.close : ui.menu}
						</button>
					</div>

					<nav
						id="site-nav"
						className={`site-header-nav${open ? ' site-header-nav-open' : ''}`}
						aria-label={ui.navLabel}>
						<GlassCard padded={false} className="site-header-panel">
							<ul>
								{ui.nav.map(({ label, href }, index) => (
									<li key={href} style={{ '--i': index }}>
										<a href={href} onClick={close}>
											{label}
										</a>
									</li>
								))}
							</ul>
						</GlassCard>
					</nav>
				</div>
			</div>
		</header>
	);
}
