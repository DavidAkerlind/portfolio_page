import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import { useContent, useUi } from '../../i18n/lang';
import './projectsSection.css';

export default function ProjectsSection() {
	const { projects } = useContent();
	const [before, accent] = useUi().projects.title;

	return (
		<section
			id="projects"
			className="container projects"
			aria-labelledby="projects-title">
			<SectionHeading
				id="projects-title"
				eyebrow="01"
				title={
					<>
						{before}
						<em>{accent}</em>
					</>
				}
			/>

			<div className="projects-list">
				{projects.map((project) => (
					<div key={project.id} className="projects-item">
						<ProjectCard
							featured
							title={project.title}
							period={project.period}
							description={project.description}
							tags={project.tags}
							links={project.links}
							image={project.image}
							imageAlt={project.imageAlt}
						/>

						{project.gallery && (
							<ul className="projects-gallery">
								{project.gallery.map((shot) => (
									<li key={shot.src}>
										<PhotoFrame
											src={shot.src}
											alt={shot.alt}
											ratio={shot.ratio ?? '16 / 10'}
											position={shot.position ?? 'top'}
											fit={shot.fit}
											zoomable
										/>
									</li>
								))}
							</ul>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
