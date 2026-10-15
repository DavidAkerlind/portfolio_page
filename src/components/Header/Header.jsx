import { useState } from 'react';
import GlassCard from '../GlassCard/GlassCard';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useUi } from '../../i18n/lang';
import './header.css';

/* Sticky glass bar with the name and the main navigation, and the light and dark
   mode switch. On small screens the links collapse behind a Menu button. */
export default function Header() {
	const ui = useUi().header;
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	return (
		<header className="site-header">
			<div className="container">
				<GlassCard padded={false} className="site-header-bar">
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
						<ul>
							{ui.nav.map(({ label, href }) => (
								<li key={href}>
									<a href={href} onClick={close}>
										{label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</GlassCard>
			</div>
		</header>
	);
}
