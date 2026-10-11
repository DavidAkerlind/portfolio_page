import { links } from '../../data/links';
import './footer.css';

const elsewhere = [
	{ label: 'Email', href: `mailto:${links.email}` },
	{ label: 'GitHub', href: links.github, external: true },
	{ label: 'LinkedIn', href: links.linkedin, external: true },
];

/* The end of the page. First row: the name and the three ways to reach David.
   Second row: a short note on how the site is made and a link back to the top. */
export default function Footer() {
	return (
		<footer className="site-footer">
			<div className="container site-footer-inner">
				<div className="site-footer-row">
					<p className="site-footer-brand">
						David <em>Åkerlind</em>
					</p>

					<nav aria-label="Elsewhere">
						<ul className="site-footer-links">
							{elsewhere.map(({ label, href, external }) => (
								<li key={label}>
									<a
										href={href}
										target={external ? '_blank' : undefined}
										rel={external ? 'noopener noreferrer' : undefined}>
										{label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="site-footer-row">
					<p className="site-footer-note">Built with React and Vite.</p>

					<a href="#top" className="site-footer-top">
						Back to top
					</a>
				</div>
			</div>
		</footer>
	);
}
