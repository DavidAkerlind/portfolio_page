import { useEffect, useRef, useState } from 'react';
import GlassCard from '../GlassCard/GlassCard';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useUi } from '../../i18n/lang';
import './header.css';

/* Sticky glass bar with the name and the main navigation, and the light and dark
   mode switch. On small screens the links collapse behind a Menu button and the
   bar folds out to hold them: its glass is a separate layer that grows by the
   height of the links, laid over the page so nothing below moves. On a wide screen
   the links become the gooey navigation (HeaderGooey), fetched once the page is up;
   until then, and without JavaScript, they are the plain links. */
const WIDE = '(min-width: 56rem)';

export default function Header() {
	const ui = useUi().header;
	const [open, setOpen] = useState(false);
	const [Gooey, setGooey] = useState(null);
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

	useEffect(() => {
		const query = window.matchMedia(WIDE);
		let gone = false;
		const load = () => {
			if (!query.matches) return;
			import('./HeaderGooey').then((module) => !gone && setGooey(() => module.default));
		};
		load();
		query.addEventListener('change', load);
		return () => {
			gone = true;
			query.removeEventListener('change', load);
		};
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

	const barClass = ['site-header-bar', open && 'site-header-bar-open', Gooey && 'site-header-bar-gooey']
		.filter(Boolean)
		.join(' ');

	return (
		<header className="site-header">
			<div className="container">
				<div className={barClass} ref={barRef}>
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

					{Gooey && (
						<div className="site-header-gooey">
							<Gooey items={ui.nav} label={ui.navLabel} />
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
