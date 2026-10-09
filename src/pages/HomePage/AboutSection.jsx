import SectionHeading from '../../components/SectionHeading/SectionHeading';
import GlassCard from '../../components/GlassCard/GlassCard';
import Timeline from '../../components/Timeline/Timeline';
import Tag from '../../components/Tag/Tag';
import {
	intro,
	education,
	experience,
	earlierWork,
	skills,
	languages,
} from '../../data/about';
import './aboutSection.css';

export default function AboutSection() {
	return (
		<section
			id="about"
			className="container about"
			aria-labelledby="about-title">
			<SectionHeading
				id="about-title"
				eyebrow="02"
				title={
					<>
						About <em>me</em>
					</>
				}>
				{intro}
			</SectionHeading>

			<div className="about-grid">
				<GlassCard as="article" className="about-card">
					<h3 className="about-card-title">Education</h3>
					<Timeline items={education} />
				</GlassCard>

				<GlassCard as="article" className="about-card">
					<h3 className="about-card-title">Experience</h3>
					<Timeline items={experience} />

					<div className="about-earlier">
						<h4 className="about-label">Earlier work</h4>
						<ul>
							{earlierWork.map(({ role, place, period }) => (
								<li key={`${place}-${period}`}>
									<span>
										{role}, {place}
									</span>
									<span className="about-earlier-period">{period}</span>
								</li>
							))}
						</ul>
					</div>
				</GlassCard>
			</div>

			<GlassCard as="article" className="about-card">
				<h3 className="about-card-title">Skills</h3>

				<div className="about-skills">
					{skills.map(({ label, items }) => (
						<div key={label} className="about-skill-group">
							<h4 className="about-label">{label}</h4>
							<ul className="tag-list">
								{items.map((item) => (
									<li key={item}>
										<Tag>{item}</Tag>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<p className="about-languages">{languages}</p>
			</GlassCard>
		</section>
	);
}
