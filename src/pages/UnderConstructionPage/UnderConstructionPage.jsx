import { useEffect, useState } from 'react';
import './underConstructionPage.css';

const links = [
	{ label: 'Email', href: 'mailto:david.akerlind@icloud.com' },
	{ label: 'GitHub', href: 'https://github.com/DavidAkerlind' },
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/david-%C3%A5kerlind-a01a61211',
	},
];

const orbs = [
	{
		size: 520,
		color: 'var(--uc-blue)',
		top: '-120px',
		left: '-100px',
		delay: '0s',
	},
	{
		size: 380,
		color: 'var(--uc-lavender)',
		bottom: '-80px',
		right: '-60px',
		delay: '-5s',
	},
	{
		size: 260,
		color: 'var(--uc-slate)',
		top: '50%',
		left: '55%',
		delay: '-9s',
	},
];

export default function UnderConstructionPage() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => setVisible(true), 50);
		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<>
			{orbs.map((orb, index) => (
				<div
					key={index}
					className="uc-orb"
					style={{
						width: orb.size,
						height: orb.size,
						background: orb.color,
						top: orb.top,
						left: orb.left,
						bottom: orb.bottom,
						right: orb.right,
						animationDelay: orb.delay,
					}}
				/>
			))}

			<div className="uc-top-accent" />

			<div className="uc-layout">
				<main className="uc-main">
					<Reveal delay="0.3s" visible={visible}>
						<section className="uc-card">
							<Reveal delay="0.4s" visible={visible}>
								<span className="uc-tag">
									Portfolio - Under Construction
								</span>
							</Reveal>

							<Reveal delay="0.55s" visible={visible}>
								<h1 className="uc-title">
									David
									<br />
									<em>Åkerlind</em>
								</h1>
							</Reveal>

							<Reveal delay="0.7s" visible={visible}>
								<div className="uc-divider" />
							</Reveal>

							<Reveal delay="0.85s" visible={visible}>
								<p className="uc-description">
									BSc student in Computer Science -
									specialising in Artificial Intelligence at
									Karlstad University. Something worth seeing
									is on its way.
								</p>
							</Reveal>

							<Reveal delay="1s" visible={visible}>
								<div className="uc-bottom-row">
									<span className="uc-status">
										<span className="uc-status-dot" />
										Currently building
									</span>

									<nav
										className="uc-links"
										aria-label="Contact links">
										{links.map(({ label, href }) => (
											<LinkItem key={label} href={href}>
												{label}
											</LinkItem>
										))}
									</nav>
								</div>
							</Reveal>
						</section>
					</Reveal>
				</main>

				<Reveal delay="1.2s" visible={visible}>
					<footer className="uc-footer"></footer>
				</Reveal>
			</div>
		</>
	);
}

function Reveal({ children, delay, visible }) {
	return (
		<div
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? 'translateY(0)' : 'translateY(18px)',
				transition: `opacity 0.8s ease ${delay}, transform 0.8s ease ${delay}`,
			}}>
			{children}
		</div>
	);
}

function LinkItem({ href, children }) {
	return (
		<a
			href={href}
			target={href.startsWith('mailto') ? undefined : '_blank'}
			rel="noopener noreferrer"
			className="uc-link-pill">
			{children}
		</a>
	);
}
