// Content for the About section, in display order. Translated from the CV.
export const intro =
	'I started in front-end development and moved on to artificial intelligence. I am curious, a quick learner and motivated by solving problems and working with modern technology, and I work well in a team.';

export const education = [
	{
		id: 'karlstad-university',
		title: 'Computer Science, Artificial Intelligence',
		place: 'Karlstad University',
		period: '2025 – 2028',
		description:
			"Bachelor's degree (BSc). I have built a foundation in programming, data structures, computer systems and artificial intelligence, and I am going deeper into systems development, machine learning and AI with Python and scikit-learn.",
	},
	{
		id: 'folkuniversitetet',
		title: 'Front-end Developer',
		place: 'Folkuniversitetet Karlstad',
		period: '2024 – 2025',
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
		description:
			'Internship at a robotics startup that works to automate retail.',
		points: [
			'Helped develop robot arms and data-collection software for AI training, including 3D printing.',
			'Designed and built a pipeline that turns store video into a point cloud, with 3D mapping of products and a 2D map of the store layout.',
			'The work aimed to make autonomous robot navigation possible in stores.',
		],
	},
];

export const earlierWork = [
	{ role: 'Kitchen assistant', place: 'The Fishery', period: '2023 – 2024' },
	{ role: 'Caretaker and service', place: 'Region Stockholm', period: 'August 2023' },
	{ role: 'Restaurant assistant', place: 'Mackverket', period: 'March – October 2023' },
	{ role: 'Food delivery', place: 'FAVO', period: '2021 – 2023' },
];

export const skills = [
	{ label: 'AI and data', items: ['Machine learning', 'scikit-learn', 'Python'] },
	{
		label: 'Web',
		items: ['JavaScript', 'React', 'HTML and CSS', 'Node.js', 'MongoDB'],
	},
	{ label: 'Systems', items: ['C', 'Assembly (MIPS)'] },
	{ label: 'Ways of working', items: ['Git', 'Agile / Scrum'] },
];

export const languages = 'Fluent in spoken and written Swedish and English.';
