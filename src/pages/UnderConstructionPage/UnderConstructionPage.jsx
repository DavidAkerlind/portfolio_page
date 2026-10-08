import { useEffect, useState } from 'react';
import Backdrop from '../../components/Backdrop/Backdrop';
import GlassCard from '../../components/GlassCard/GlassCard';
import Button from '../../components/Button/Button';
import './underConstructionPage.css';

const links = [
	{ label: 'Email', href: 'mailto:david.akerlind@icloud.com' },
	{ label: 'GitHub', href: 'https://github.com/DavidAkerlind' },
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/david-%C3%A5kerlind-a01a61211',
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
			<Backdrop />

			<div className="uc-layout">
				<main className="uc-main">
					<Reveal delay="0.3s" visible={visible}>
						<GlassCard as="section" className="uc-card">
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
											<Button
												key={label}
												href={href}
												variant="secondary">
												{label}
											</Button>
										))}
									</nav>
								</div>
							</Reveal>
						</GlassCard>
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
