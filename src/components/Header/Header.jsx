import { useState } from 'react';
import GlassCard from '../GlassCard/GlassCard';
import './header.css';

const links = [
	{ label: 'Projects', href: '#projects' },
	{ label: 'About', href: '#about' },
	{ label: 'Interests', href: '#interests' },
	{ label: 'Contact', href: '#contact' },
];

/* Sticky glass bar with the name and the main navigation. On small screens the
   links collapse behind a Menu button. */
export default function Header() {
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	return (
		<header className="site-header">
			<div className="container">
				<GlassCard padded={false} className="site-header-bar">
					<a href="#top" className="site-header-brand" onClick={close}>
						David <em>Åkerlind</em>
					</a>

					<button
						type="button"
						className="site-header-toggle"
						aria-expanded={open}
						aria-controls="site-nav"
						onClick={() => setOpen(!open)}>
						{open ? 'Close' : 'Menu'}
					</button>

					<nav
						id="site-nav"
						className={`site-header-nav${open ? ' site-header-nav-open' : ''}`}
						aria-label="Main">
						<ul>
							{links.map(({ label, href }) => (
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
