import { useEffect, useRef, useState } from 'react';
import GlassCard from '../GlassCard/GlassCard';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useUi } from '../../i18n/lang';
import './header.css';

/* Sticky glass bar with the name and the main navigation, and the light and dark
   mode switch. On small screens the links collapse behind a Menu button and the
   bar folds out to hold them: its glass is a separate layer that grows by the
   height of the links, laid over the page so nothing below moves. */
export default function Header() {
	const ui = useUi().header;
	const [open, setOpen] = useState(false);
	const barRef = useRef(null);
	const listRef = useRef(null);
	const close = () => setOpen(false);

	/* The glass needs to know how tall the links are to grow to fit them. Measure
	   the list (again if the language, the font or the width changes it) and hand
	   it to the CSS as --panel-h. */
	useEffect(() => {
		const bar = barRef.current;
		const list = listRef.current;
		if (!bar || !list || typeof ResizeObserver === 'undefined') return undefined;
		const measure = () => bar.style.setProperty('--panel-h', `${list.offsetHeight}px`);
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(list);
		return () => observer.disconnect();
	}, []);

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
				<div className={`site-header-bar${open ? ' site-header-bar-open' : ''}`} ref={barRef}>
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

					<nav id="site-nav" className="site-header-nav" aria-label={ui.navLabel}>
						<ul ref={listRef}>
							{ui.nav.map(({ label, href }, index) => (
								<li key={href} style={{ '--i': index }}>
									<a href={href} onClick={close}>
										{label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
