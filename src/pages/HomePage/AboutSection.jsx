import SectionHeading from '../../components/SectionHeading/SectionHeading';
import GlassCard from '../../components/GlassCard/GlassCard';
import Timeline from '../../components/Timeline/Timeline';
import Tag from '../../components/Tag/Tag';
import { useContent, useUi } from '../../i18n/lang';
import './aboutSection.css';

export default function AboutSection() {
	const { intro, education, experience, skills } = useContent();
	const ui = useUi().about;

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
						{ui.title[0]}
						<em>{ui.title[1]}</em>
					</>
				}>
				{intro}
			</SectionHeading>

			<div className="about-grid">
				<GlassCard as="article" className="about-card">
					<h3 className="about-card-title">{ui.education}</h3>
					<Timeline items={education} />
				</GlassCard>

				<GlassCard as="article" className="about-card">
					<h3 className="about-card-title">{ui.experience}</h3>
					<Timeline items={experience} />
				</GlassCard>
			</div>

			<GlassCard as="article" className="about-card">
				<h3 className="about-card-title">{ui.skills}</h3>

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
			</GlassCard>
		</section>
	);
}
