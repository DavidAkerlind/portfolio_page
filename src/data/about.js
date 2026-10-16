import karlstadLogo from '../assets/logos/karlstad-university.webp';
import folkuniversitetetLogo from '../assets/logos/folkuniversitetet.webp';
import cotaLogo from '../assets/logos/cota-robotics.svg';

// Content for the About section, in display order. Translated from the CV.
// `logo` is a silhouette, shown as a glass logo beside the entry.
export const intro =
	'I started in front-end development and moved on to artificial intelligence. I am curious, a quick learner and motivated by solving problems and working with modern technology, and I work well in a team.';

export const education = [
	{
		id: 'karlstad-university',
		title: 'Computer Science, Artificial Intelligence',
		place: 'Karlstad University',
		period: '2025 – 2028',
		logo: karlstadLogo,
		description:
			"Bachelor's degree (BSc). I have built a foundation in programming, data structures, computer systems and artificial intelligence. This term the focus is software development and optimising AI.",
	},
	{
		id: 'folkuniversitetet',
		title: 'Front-end Developer',
		place: 'Folkuniversitetet Karlstad',
		period: '2024 – 2025',
		logo: folkuniversitetetLogo,
		description:
			'A two-year higher vocational programme: UI/UX, HTML and CSS, JavaScript, React and agile methods. I left after one year to start my current degree in AI.',
	},
];

export const experience = [
	{
		id: 'cota-robotics',
		title: 'Tech intern',
		place: 'Cota Robotics',
		placeHref: 'https://www.cotarobotics.com',
		period: 'June – August 2026',
		logo: cotaLogo,
		description:
			'Internship at a robotics startup that works to automate retail. Most of my time went into software development, but I got to try a wide variety of things, from learning about robotics and testing to bringing in ideas of my own, and I learned a lot from the team around me. I hope to be back next summer.',
		points: [
			'Helped develop robot arms and data-collection software for AI training, including 3D printing.',
			'Designed and built a pipeline that turns store video into a point cloud, with 3D mapping of products and a 2D map of the store layout.',
			'Cota was at an early stage then, with a small, tight team.',
		],
	},
];

export const skills = [
	{ label: 'AI and data', items: ['Machine learning', 'scikit-learn', 'Hugging Face', 'Python'] },
	{
		label: 'Web',
		items: ['JavaScript', 'React', 'HTML and CSS', 'Node.js', 'MongoDB'],
	},
	{ label: 'Systems', items: ['C', 'Assembly (MIPS)'] },
	{ label: 'Ways of working', items: ['Git', 'Agile / Scrum'] },
];
