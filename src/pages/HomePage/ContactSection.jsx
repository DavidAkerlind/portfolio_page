import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ContactLink from '../../components/ContactLink/ContactLink';
import { links } from '../../data/links';
import './contactSection.css';

// Email first: it is the quickest way to reach me. No phone number, on purpose.
const contacts = [
	{ id: 'email', icon: 'mail', label: 'Email', value: links.email, href: `mailto:${links.email}` },
	{ id: 'github', icon: 'github', label: 'GitHub', value: 'DavidAkerlind', href: links.github },
	{ id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', value: 'David Åkerlind', href: links.linkedin },
];

export default function ContactSection() {
	return (
		<section
			id="contact"
			className="container contact"
			aria-labelledby="contact-title">
			<SectionHeading
				id="contact-title"
				eyebrow="04"
				title={
					<>
						Get in <em>touch</em>
					</>
				}>
				Have a question, an idea or something you would like to build together?
				Email is the quickest way to reach me. You can also find me on GitHub
				and LinkedIn.
			</SectionHeading>

			<ul className="contact-list">
				{contacts.map(({ id, ...contact }) => (
					<li key={id}>
						<ContactLink {...contact} />
					</li>
				))}
			</ul>
		</section>
	);
}
