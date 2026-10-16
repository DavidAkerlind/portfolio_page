import { links } from '../../data/links';
import { useLang, useSwitchLang, useUi } from '../../i18n/lang';
import './footer.css';

// The same page in each language. They are real links (search engines follow them, and
// they work without JavaScript); on the home page a plain click changes the language in
// place instead (see App.jsx).
const languages = [
	{ code: 'en', label: 'English', href: '/' },
	{ code: 'sv', label: 'Svenska', href: '/sv/' },
];

/* The end of the page. First row: the name and the three ways to reach David.
   Second row: the language choice and a link back to the top. */
export default function Footer() {
	const ui = useUi().footer;
	const lang = useLang();
	const switchLang = useSwitchLang();

	const elsewhere = [
		{ label: ui.email, href: `mailto:${links.email}` },
		{ label: 'GitHub', href: links.github, external: true },
		{ label: 'LinkedIn', href: links.linkedin, external: true },
	];

	return (
		<footer className="site-footer">
			<div className="container site-footer-inner">
				<div className="site-footer-row">
					<p className="site-footer-brand">
						David <em>Åkerlind</em>
					</p>

					<nav aria-label={ui.elsewhere}>
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
					<nav aria-label={ui.language}>
						<ul className="site-footer-links site-footer-languages">
							{languages.map(({ code, label, href }) => (
								<li key={code}>
									<a
										href={href}
										lang={code}
										hrefLang={code}
										aria-current={code === lang ? 'true' : undefined}
										onClick={(event) => {
											const plain =
												event.button === 0 &&
												!(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
											if (!switchLang || !plain) return;
											event.preventDefault();
											if (code !== lang) switchLang(code);
										}}>
										{label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<a href="#top" className="site-footer-top">
						{ui.top}
					</a>
				</div>
			</div>
		</footer>
	);
}
