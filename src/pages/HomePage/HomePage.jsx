import Backdrop from '../../components/Backdrop/Backdrop';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import Footer from '../../components/Footer/Footer';
import { picture } from '../../lib/picture';
import { links } from '../../data/links';
import { useUi } from '../../i18n/lang';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import OutsideSection from './OutsideSection';
import ContactSection from './ContactSection';
import './homePage.css';

const portrait = picture('photos/david-portrait', 800, [480, 640]);

export default function HomePage() {
	return (
		<>
			<Backdrop />
			<Header />

			<main>
				<Hero />
				<ProjectsSection />
				<AboutSection />
				<OutsideSection />
				<ContactSection />
			</main>

			<Footer />
		</>
	);
}

function Hero() {
	const ui = useUi().hero;

	return (
		<section className="hero" aria-labelledby="hero-title">
			<div className="container hero-grid">
				<div className="hero-text">
					<span className="hero-eyebrow">
						{ui.eyebrow}
					</span>

					<h1 id="hero-title" className="hero-title">
						David
						<br />
						<em>Åkerlind</em>
					</h1>

					<p className="hero-lead">{ui.lead}</p>

					<div className="hero-actions">
						<Button href="#projects">{ui.projects}</Button>
						<Button href={`mailto:${links.email}`} variant="secondary">
							{ui.contact}
						</Button>
					</div>
				</div>

				<PhotoFrame
					className="hero-photo"
					src={portrait}
					ratio="4 / 5"
					sizes="(min-width: 52rem) 400px, calc(100vw - 54px)"
					loading="eager"
					fetchPriority="high"
					alt={ui.portraitAlt}
				/>
			</div>
		</section>
	);
}
