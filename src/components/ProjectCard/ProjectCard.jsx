import GlassCard from '../GlassCard/GlassCard';
import PhotoFrame from '../PhotoFrame/PhotoFrame';
import Tag from '../Tag/Tag';
import Button from '../Button/Button';
import { useUi } from '../../i18n/lang';
import './projectCard.css';

/* A project: screenshot, title, short description, technologies and links.
   `featured` lays the card out wide (image beside text) on larger screens.
   `headingLevel` sets the title's heading level (3 by default). */
export default function ProjectCard({
	title,
	period,
	description,
	tags = [],
	links = [],
	image,
	imageAlt = '',
	featured = false,
	headingLevel = 3,
}) {
	const ui = useUi().photo;
	const Heading = `h${headingLevel}`;

	return (
		<GlassCard
			as="article"
			interactive
			padded={false}
			className={`project-card${featured ? ' project-card-featured' : ''}`}>
			<PhotoFrame
				src={image}
				alt={imageAlt}
				ratio="16 / 10"
				sizes="(min-width: 52rem) 480px, calc(100vw - 54px)"
				placeholder={ui.screenshotPlaceholder}
				zoomable
				className="project-card-media"
			/>

			<div className="project-card-body">
				{period && <span className="project-card-period">{period}</span>}
				<Heading className="project-card-title">{title}</Heading>
				<p className="project-card-description">{description}</p>

				{tags.length > 0 && (
					<ul className="tag-list">
						{tags.map((tag) => (
							<li key={tag}>
								<Tag>{tag}</Tag>
							</li>
						))}
					</ul>
				)}

				{links.length > 0 && (
					<div className="project-card-links">
						{links.map(({ label, href }) => (
							<Button key={label} href={href} variant="secondary">
								{label}
							</Button>
						))}
					</div>
				)}
			</div>
		</GlassCard>
	);
}
