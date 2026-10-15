import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ContactLink from '../../components/ContactLink/ContactLink';
import { links } from '../../data/links';
import { useUi } from '../../i18n/lang';
import './contactSection.css';

// Email first: it is the quickest way to reach me. No phone number, on purpose.
const contacts = (emailLabel) => [
	{ id: 'email', icon: 'mail', label: emailLabel, value: links.email, href: `mailto:${links.email}` },
	{ id: 'github', icon: 'github', label: 'GitHub', value: 'DavidAkerlind', href: links.github },
	{ id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', value: 'David Åkerlind', href: links.linkedin },
];

export default function ContactSection() {
	const ui = useUi().contact;

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
						{ui.title[0]}
						<em>{ui.title[1]}</em>
					</>
				}>
				{ui.lead}
			</SectionHeading>

			<ul className="contact-list">
				{contacts(ui.email).map(({ id, ...contact }) => (
					<li key={id}>
						<ContactLink {...contact} />
					</li>
				))}
			</ul>
		</section>
	);
}
