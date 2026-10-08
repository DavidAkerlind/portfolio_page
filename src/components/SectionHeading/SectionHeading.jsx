import './sectionHeading.css';

/* Eyebrow label, serif title and an optional lead paragraph.
   Wrap one word of the title in <em> to get the lavender italic accent. */
export default function SectionHeading({ id, eyebrow, title, children }) {
	return (
		<header className="section-heading">
			{eyebrow && <span className="section-heading-eyebrow">{eyebrow}</span>}
			<h2 id={id} className="section-heading-title">
				{title}
			</h2>
			{children && <p className="section-heading-lead">{children}</p>}
		</header>
	);
}
