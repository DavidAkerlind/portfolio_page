import golfSwing from '../assets/photos/golf-swing.webp';
import skateTrickMp4 from '../assets/video/skate-trick.mp4';
import skateTrickWebm from '../assets/video/skate-trick.webm';
import skateTrickPoster from '../assets/video/skate-trick-poster.webp';
import mlPlayground from '../assets/tools/ml-playground.webp';
import statsLab from '../assets/tools/stats-lab.webp';

// Content for the "Outside the code" section, in display order.

export const marathon = {
	// First marathon, Stockholm 2026: the official finish time.
	finishTime: '04:09:34',
	finishAriaLabel: 'Official finish time: 4 hours 9 minutes 34 seconds',
	// The next one. The start time is Stockholm time (CEST, UTC+2).
	next: {
		name: 'Stockholm Marathon 2027',
		start: '2027-05-29T12:00:00+02:00',
		startLabel: '29 May 2027',
		href: 'https://www.stockholmmarathon.se',
	},
};

export const activities = [
	{
		id: 'golf',
		title: 'Golf',
		text: 'Out on the course.',
		photo: {
			src: golfSwing,
			alt: 'David seen from behind finishing a golf swing on a sunny course, with birch trees on the left and a clear blue sky',
		},
	},
	{
		id: 'skateboarding',
		title: 'Skateboarding',
		text: 'A tre flip. I want to get back into skating.',
		video: {
			sources: [
				{ src: skateTrickMp4, type: 'video/mp4' },
				{ src: skateTrickWebm, type: 'video/webm' },
			],
			poster: skateTrickPoster,
			alt: 'Short looping clip of a tre flip at a skatepark: the skater rolls in, pops the board, it spins under their feet in the air, and they land and roll away',
		},
	},
];

export const alsoInto = ['Rock climbing', 'Travelling', 'Family'];

export const studyTools = {
	title: 'Vibe-coded study tools',
	intro:
		'I build tools to experiment with what I am learning, so I can understand it in a more interactive and visual way. I make them together with Lovable and Claude Code.',
	items: [
		{
			id: 'ml-playground',
			title: 'ML Playground',
			period: 'Study tool',
			description:
				'An interactive machine learning playground with real-time visual simulations. Train a FrozenLake Q-learning agent live, tune regression and KNN models, explore K-Means clustering and PCA, forecast time series, and practise with timed exam simulations and flashcards.',
			tags: ['Machine learning', 'Q-learning', 'Visualisation', 'Lovable'],
			links: [{ label: 'Open site', href: 'https://explore-ml.lovable.app/' }],
			image: mlPlayground,
			imageAlt:
				'ML Playground: a dark dashboard with a FrozenLake grid, sliders for training settings, a Q-table heatmap and charts of reward and success rate',
		},
		{
			id: 'stats-lab',
			title: 'Stats Lab',
			period: 'Study tool',
			description:
				'An interactive study tool for statistics. Edit number sets and see descriptive statistics and box plots update instantly. A separate Probability Lab shows sample spaces, Venn diagrams, contingency tables, conditional probabilities and probability trees in real time.',
			tags: ['Statistics', 'Probability', 'Visualisation', 'Lovable'],
			links: [
				{ label: 'Open site', href: 'https://explore-statistics.lovable.app/' },
			],
			image: statsLab,
			imageAlt:
				'Stats Lab: two number sets, Set A and Set B, as editable values with the mean, median, mode, variance and range calculated below',
		},
	],
};
