// Golf and skateboarding are listed under "Also" for now. Their photo and clip are
// kept here, commented out, so the cards can come back: uncomment these imports and
// the two entries in `activities`, and remove the two names from `alsoInto`.
// import golfSwing from '../assets/photos/golf-swing.webp';
// import skateTrickMp4 from '../assets/video/skate-trick.mp4';
// import skateTrickWebm from '../assets/video/skate-trick.webm';
// import skateTrickPoster from '../assets/video/skate-trick-poster.webp';
import { picture } from '../lib/picture';

const mlPlayground = picture('tools/ml-playground', 1120, [560, 840]);
const statsLab = picture('tools/stats-lab', 1120, [560, 840]);

// Content for the "My interests" section, in display order.

export const marathon = {
	// How running started and what David likes about it.
	story:
		'I picked up running in early 2026. I am not the fastest, but I really like going for a few runs a week when I have time. My favourite runs are the chill long ones, where you get to see a lot and explore new places, preferably in the morning or on a sunny afternoon.',
	// First marathon, Stockholm 2026: the official finish time.
	finishTime: '04:09:34',
	finishLabel: 'Stockholm 2026',
	finishAriaLabel: 'Official finish time: 4 hours 9 minutes 34 seconds',
	// The next one. The start time is Stockholm time (CEST, UTC+2).
	next: {
		name: 'Stockholm Marathon 2027',
		label: 'Stockholm 2027',
		start: '2027-05-29T12:00:00+02:00',
		startLabel: '29 May 2027',
		href: 'https://www.stockholmmarathon.se',
	},
};

export const activities = [
	// {
	// 	id: 'golf',
	// 	title: 'Golf',
	// 	text: 'Out on the course.',
	// 	photo: {
	// 		src: golfSwing,
	// 		alt: 'David seen from behind finishing a golf swing on a sunny course, with birch trees on the left and a clear blue sky',
	// 	},
	// },
	// {
	// 	id: 'skateboarding',
	// 	title: 'Skateboarding',
	// 	text: 'A tre flip. I want to get back into skating.',
	// 	video: {
	// 		sources: [
	// 			{ src: skateTrickMp4, type: 'video/mp4' },
	// 			{ src: skateTrickWebm, type: 'video/webm' },
	// 		],
	// 		poster: skateTrickPoster,
	// 		alt: 'Short looping clip of a tre flip at a skatepark: the skater rolls in, pops the board, it spins under their feet in the air, and they land and roll away',
	// 	},
	// },
];

export const alsoInto = [
	'Golf',
	'Skateboarding',
	'Rock climbing',
	'Travelling',
	'Nature',
	'Sailing',
	'Family',
];

export const studyTools = {
	title: 'Vibe-coded study tools',
	intro:
		'I like building tools to experiment with what I am learning, so I can understand it in a more interactive and visual way. I mostly work with Claude Code and Lovable.',
	items: [
		{
			id: 'ml-playground',
			title: 'ML Playground',
			period: 'Study tool',
			description:
				'When I was learning the basics of machine learning and reinforcement learning, I wanted to see what changing the parameters actually did, not just look at numbers. So I vibe-coded this site, where I can control a scenario and watch what happens. Feel free to try it yourself. I kept adding to it, from the first RL sandbox to flashcards, an exam question generator and more ML tools.',
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
				'I am studying statistics right now and wanted help with Venn diagrams, and a quick way to get everything calculated from a set of numbers, from the normal distribution to intersections and unions, with graphs that help me see probabilities and more.',
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
