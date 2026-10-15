import Backdrop from '../../components/Backdrop/Backdrop';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import Footer from '../../components/Footer/Footer';
import portrait from '../../assets/photos/david-portrait.webp';
import { links } from '../../data/links';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import OutsideSection from './OutsideSection';
import ContactSection from './ContactSection';
import './homePage.css';

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
	return (
		<section className="hero" aria-labelledby="hero-title">
			<div className="container hero-grid">
				<div className="hero-text">
					<span className="hero-eyebrow">
						Computer Science · Artificial Intelligence
					</span>

					<h1 id="hero-title" className="hero-title">
						David
						<br />
						<em>Åkerlind</em>
					</h1>

					<p className="hero-lead">
						I have always liked technology and building things. A few years ago I
						realised I had no idea how the tools I used every day were built, so
						I started to learn. That led me into programming, system development
						and AI.
					</p>

					<div className="hero-actions">
						<Button href="#projects">See my projects</Button>
						<Button href={`mailto:${links.email}`} variant="secondary">
							Get in touch
						</Button>
					</div>
				</div>

				<PhotoFrame
					className="hero-photo"
					src={portrait}
					ratio="4 / 5"
					loading="eager"
					fetchPriority="high"
					alt="David Åkerlind smiling on the deck of a boat, with a lake and forest behind"
				/>
			</div>
		</section>
	);
}
