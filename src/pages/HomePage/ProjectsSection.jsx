import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import { projects } from '../../data/projects';
import './projectsSection.css';

export default function ProjectsSection() {
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
						Selected <em>projects</em>
					</>
				}>
				What I have built so far, from a full-stack site for a Stockholm
				restaurant to this portfolio.
			</SectionHeading>

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
											ratio="16 / 10"
											position="top"
											caption={shot.caption}
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
