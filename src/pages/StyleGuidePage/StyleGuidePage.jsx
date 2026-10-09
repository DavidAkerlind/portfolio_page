import { useEffect, useRef } from 'react';
import Backdrop from '../../components/Backdrop/Backdrop';
import GlassCard from '../../components/GlassCard/GlassCard';
import Button from '../../components/Button/Button';
import Tag from '../../components/Tag/Tag';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import TimerDisplay from '../../components/TimerDisplay/TimerDisplay';
import './styleGuidePage.css';

const colors = [
	{ token: '--color-bg', role: 'Page background' },
	{ token: '--color-navy', role: 'Raised surfaces' },
	{ token: '--color-blue', role: 'Fills and borders, never text' },
	{ token: '--color-slate', role: 'Quiet fills and dividers, never text' },
	{ token: '--color-muted', role: 'Secondary text' },
	{ token: '--color-lavender', role: 'Accent, links, highlights' },
	{ token: '--color-text', role: 'Primary text' },
	{ token: '--color-white', role: 'Text on blue fills' },
	{ token: '--color-timer', role: 'The marathon timer only' },
];

const typeScale = [
	{ name: 'Hero', token: '--text-hero', font: 'display', sample: 'Åkerlind' },
	{
		name: 'Section title',
		token: '--text-2xl',
		font: 'display',
		sample: 'Selected projects',
	},
	{
		name: 'Card title',
		token: '--text-xl',
		font: 'display',
		sample: 'Harpaviljongen',
	},
	{
		name: 'Lead',
		token: '--text-lg',
		font: 'base',
		sample: 'A short paragraph that introduces a section.',
	},
	{
		name: 'Body',
		token: '--text-base',
		font: 'base',
		sample: 'Regular paragraph text, easy to read at length.',
	},
	{
		name: 'Small',
		token: '--text-sm',
		font: 'base',
		sample: 'Secondary information and notes.',
	},
	{
		name: 'Label',
		token: '--text-xs',
		font: 'mono',
		sample: 'Eyebrows, tags and buttons',
	},
];

const spacing = ['--space-1', '--space-2', '--space-3', '--space-4', '--space-6', '--space-8', '--space-12', '--space-16', '--space-24'];

const sections = [
	['colors', 'Colors'],
	['type', 'Type'],
	['layout', 'Space and shape'],
	['glass', 'Glass'],
	['buttons', 'Buttons and tags'],
	['projects', 'Project cards'],
	['photos', 'Photos'],
	['timer', 'Timer'],
];

export default function StyleGuidePage() {
	return (
		<>
			<Backdrop />

			<main className="container sg">
				<header className="sg-intro">
					<SectionHeading
						eyebrow="Design system"
						title={
							<>
								Style <em>guide</em>
							</>
						}>
						Everything the site is built from: colors, type, glass surfaces and
						the small components. Preview page only, not part of the portfolio.
					</SectionHeading>

					<nav className="sg-nav" aria-label="Style guide sections">
						{sections.map(([id, label]) => (
							<Button key={id} href={`#${id}`} variant="secondary">
								{label}
							</Button>
						))}
					</nav>
				</header>

				<section className="sg-section" aria-labelledby="colors">
					<SectionHeading id="colors" eyebrow="01" title="Colors">
						One palette. Lavender is the accent; blue and slate are too dark for
						text and are used for fills and borders only.
					</SectionHeading>
					<div className="sg-swatches">
						{colors.map((color) => (
							<Swatch key={color.token} {...color} />
						))}
					</div>
				</section>

				<section className="sg-section" aria-labelledby="type">
					<SectionHeading id="type" eyebrow="02" title="Type">
						DM Serif Display for headings, DM Sans for reading, DM Mono for
						small labels.
					</SectionHeading>
					<GlassCard className="sg-type">
						{typeScale.map(({ name, token, font, sample }) => (
							<div key={token} className="sg-type-row">
								<span className="sg-meta">
									{name}
									<br />
									{token}
								</span>
								<span
									className={`sg-type-sample sg-type-${font}`}
									style={{ fontSize: `var(${token})` }}>
									{sample}
								</span>
							</div>
						))}
					</GlassCard>
				</section>

				<section className="sg-section" aria-labelledby="layout">
					<SectionHeading id="layout" eyebrow="03" title="Space and shape">
						A fixed spacing scale and three corner radii. Nothing in between.
					</SectionHeading>
					<div className="sg-layout">
						<GlassCard className="sg-spacing">
							{spacing.map((token) => (
								<div key={token} className="sg-spacing-row">
									<span className="sg-meta">{token}</span>
									<span
										className="sg-spacing-bar"
										style={{ width: `var(${token})` }}
									/>
								</div>
							))}
						</GlassCard>
						<div className="sg-radii">
							{['--radius-md', '--radius-lg', '--radius-pill'].map((token) => (
								<div key={token} className="sg-radius-item">
									<span
										className="sg-radius-box"
										style={{ borderRadius: `var(${token})` }}
									/>
									<span className="sg-meta">{token}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="sg-section" aria-labelledby="glass">
					<SectionHeading id="glass" eyebrow="04" title="Glass">
						The signature surface: a translucent fill with a blur, a hairline
						border and a soft shadow. It needs the backdrop behind it, so every
						page renders one.
					</SectionHeading>
					<div className="sg-grid-2">
						<GlassCard>
							<h3 className="sg-card-title">Glass card</h3>
							<p className="sg-muted">
								The default surface for any block of content.
							</p>
						</GlassCard>
						<GlassCard interactive>
							<h3 className="sg-card-title">Interactive glass card</h3>
							<p className="sg-muted">
								Hover to see the border and fill brighten.
							</p>
						</GlassCard>
					</div>
				</section>

				<section className="sg-section" aria-labelledby="buttons">
					<SectionHeading id="buttons" eyebrow="05" title="Buttons and tags">
						Primary for the one main action, secondary for everything else.
						Links starting with http open in a new tab.
					</SectionHeading>
					<div className="sg-row">
						<Button href="#projects">Primary</Button>
						<Button href="#projects" variant="secondary">
							Secondary
						</Button>
						<Button href="https://github.com/DavidAkerlind" variant="secondary">
							GitHub
						</Button>
					</div>
					<ul className="tag-list">
						{['React', 'Node.js', 'MongoDB', 'Python', 'scikit-learn'].map(
							(tag) => (
								<li key={tag}>
									<Tag>{tag}</Tag>
								</li>
							),
						)}
					</ul>
				</section>

				<section className="sg-section" aria-labelledby="projects">
					<SectionHeading id="projects" eyebrow="06" title="Project cards">
						The projects are the focus of the site. A featured card runs wide;
						standard cards sit two to a row. Sample content for now.
					</SectionHeading>
					<ProjectCard
						featured
						title="Harpaviljongen"
						period="June 2025"
						description="A complete web solution for a restaurant: a public website and an admin panel where staff update menus and opening hours directly. Built with React and a REST API in Node.js on MongoDB."
						tags={['React', 'Node.js', 'MongoDB', 'REST API']}
						links={[
							{ label: 'Visit site', href: 'https://www.harpaviljongen.com' },
						]}
					/>
					<div className="sg-grid-2">
						<ProjectCard
							title="This portfolio"
							period="2026"
							description="The site you are looking at: a simple, glassy React site with its own small design system, hosted on Cloudflare."
							tags={['React', 'Vite', 'CSS', 'Cloudflare']}
							links={[
								{
									label: 'Source',
									href: 'https://github.com/DavidAkerlind/portfolio_page',
								},
							]}
						/>
						<ProjectCard
							title="Project title"
							period="Year"
							description="Placeholder: one or two sentences on what it does and what you built."
							tags={['Tag', 'Tag']}
						/>
					</div>
				</section>

				<section className="sg-section" aria-labelledby="photos">
					<SectionHeading id="photos" eyebrow="07" title="Photos">
						A frame for your own pictures, in any ratio, with an optional
						caption. Placeholders stand in until the real photos arrive.
					</SectionHeading>
					<div className="sg-photos">
						<PhotoFrame ratio="4 / 3" caption="Landscape, 4:3" />
						<PhotoFrame ratio="3 / 4" caption="Portrait, 3:4" />
						<PhotoFrame ratio="1 / 1" caption="Square, 1:1" />
					</div>
				</section>

				<section className="sg-section" aria-labelledby="timer">
					<SectionHeading id="timer" eyebrow="08" title="Timer">
						Seven-segment digits in red liquid glass: bright rims on the edges,
						a soft bevel, and no glow. Used for the marathon time. The time is
						passed as text, so seconds can be added later.
					</SectionHeading>
					<div className="sg-row">
						<TimerDisplay
							label="Stockholm Marathon · 2026"
							time="04:09"
							caption="hours : minutes"
							ariaLabel="Finish time: 4 hours 9 minutes"
						/>
						<TimerDisplay
							label="With seconds"
							time="03:59:58"
							caption="hours : minutes : seconds"
							ariaLabel="3 hours 59 minutes 58 seconds"
						/>
					</div>
				</section>
			</main>
		</>
	);
}

/* A color chip. The hex value is read from the live CSS variable, so this page
   can never drift from index.css. */
function Swatch({ token, role }) {
	const hexRef = useRef(null);

	useEffect(() => {
		const value = getComputedStyle(document.documentElement)
			.getPropertyValue(token)
			.trim();
		hexRef.current.textContent = value;
	}, [token]);

	return (
		<div className="sg-swatch">
			<span
				className="sg-swatch-chip"
				style={{ background: `var(${token})` }}
			/>
			<span className="sg-swatch-token">{token}</span>
			<span className="sg-meta" ref={hexRef} />
			<span className="sg-muted">{role}</span>
		</div>
	);
}
