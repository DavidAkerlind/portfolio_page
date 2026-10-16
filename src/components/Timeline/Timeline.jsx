import GlassLogo from '../GlassLogo/GlassLogo';
import './timeline.css';

/* A vertical list of dated entries, used for education and work experience.
   Each item: id, title, place, period, and optionally placeHref (links the
   place), logo (a silhouette shown as a glass logo beside the heading),
   description and points (a short bullet list). */
export default function Timeline({ items }) {
	return (
		<ol className="timeline">
			{items.map(
				({
					id,
					title,
					place,
					placeHref,
					period,
					logo,
					description,
					points = [],
				}) => (
					<li key={id} className="timeline-item">
						<div className="timeline-head">
							<div className="timeline-heading">
								<span className="timeline-period">{period}</span>
								<h4 className="timeline-title">{title}</h4>
								<p className="timeline-place">
									{placeHref ? (
										<a href={placeHref} target="_blank" rel="noopener noreferrer">
											{place}
										</a>
									) : (
										place
									)}
								</p>
							</div>

							{logo && <GlassLogo className="timeline-logo" src={logo} />}
						</div>

						{description && (
							<p className="timeline-description">{description}</p>
						)}

						{points.length > 0 && (
							<ul className="timeline-points">
								{points.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>
						)}
					</li>
				),
			)}
		</ol>
	);
}
