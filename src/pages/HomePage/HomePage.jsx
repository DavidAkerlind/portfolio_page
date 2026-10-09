import Backdrop from '../../components/Backdrop/Backdrop';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import portrait from '../../assets/photos/david-portrait.webp';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import './homePage.css';

// Placeholder sections so the header navigation has somewhere to scroll to.
// Each one is replaced by the real section in its own branch.
const upcoming = [
	{ id: 'interests', eyebrow: '03', title: 'Outside the code' },
	{ id: 'contact', eyebrow: '04', title: 'Contact' },
];

export default function HomePage() {
	return (
		<>
			<Backdrop />
			<Header />

			<main>
				<Hero />
				<ProjectsSection />
				<AboutSection />

				{upcoming.map(({ id, eyebrow, title }) => (
					<section
						key={id}
						id={id}
						className="container home-upcoming"
						aria-labelledby={`${id}-title`}>
						<SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title}>
							Coming in the next step.
						</SectionHeading>
					</section>
				))}
			</main>
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
						BSc student in Computer Science, specialising in Artificial
						Intelligence at Karlstad University. I like technology in all its
						forms, from programming and system development to electronics and
						AI.
					</p>

					<div className="hero-actions">
						<Button href="#projects">See my projects</Button>
						<Button href="mailto:david.akerlind@icloud.com" variant="secondary">
							Get in touch
						</Button>
					</div>
				</div>

				<PhotoFrame
					className="hero-photo"
					src={portrait}
					ratio="4 / 5"
					loading="eager"
					alt="David Åkerlind smiling on the deck of a boat, with a lake and forest behind"
				/>
			</div>
		</section>
	);
}
