import harpaviljongenStart from '../assets/projects/harpaviljongen-start.webp';
import harpaviljongenMenu from '../assets/projects/harpaviljongen-menu.webp';
import harpaviljongenInfo from '../assets/projects/harpaviljongen-info.webp';
import harpaviljongenAdmin from '../assets/projects/harpaviljongen-admin.webp';
import harpaviljongenAdminMobile from '../assets/projects/harpaviljongen-admin-mobile.webp';
import kneeStart from '../assets/projects/knee-training-start.webp';
import kneeExercise from '../assets/projects/knee-training-exercise.webp';
import kneePhone from '../assets/projects/knee-training-phone.webp';
import kneeRunning from '../assets/projects/knee-training-running.webp';
import kneeInfo from '../assets/projects/knee-training-info.webp';
import portfolioHome from '../assets/projects/portfolio-home.webp';

// Projects shown in the Projects section, in display order.
// `gallery` items are extra screenshots, shown cropped to the top of the page (16 / 10
// unless the item sets its own `ratio`, and `fit: 'contain'` shows a whole picture
// inside the frame) and opened uncropped when clicked.
export const projects = [
	{
		id: 'harpaviljongen',
		title: 'Harpaviljongen',
		period: 'June 2025',
		description:
			'A complete website solution for a Stockholm restaurant: a public site and an admin panel where the staff update menus and opening hours themselves. I handled everything that took it to production, from the React front end to the REST API in Node.js on MongoDB.',
		tags: ['React', 'Node.js', 'MongoDB', 'REST API', 'Constantly improving'],
		links: [
			{ label: 'Visit site', href: 'https://www.harpaviljongen.com' },
			{ label: 'Source', href: 'https://github.com/DavidAkerlind/harpaviljongen' },
		],
		image: harpaviljongenStart,
		imageAlt:
			'Harpaviljongen start page: a set table in a dim dining room with a green rabbit logo and a Boka bord (book a table) button',
		gallery: [
			{
				src: harpaviljongenMenu,
				alt: 'Harpaviljongen page with a photo of an oyster dish, Meny and Vinlista buttons, and links to Instagram and Facebook',
			},
			{
				src: harpaviljongenInfo,
				alt: 'Harpaviljongen opening hours, contact details, a map and a newsletter sign-up',
			},
			{
				src: harpaviljongenAdmin,
				alt: 'The Harpaviljongen admin panel: an overview with visitor numbers, system status, recent changes, opening hours and the current menus',
				ratio: '1120 / 660',
			},
			{
				src: harpaviljongenAdminMobile,
				alt: 'The admin panel on three phone screens: the overview, visitor statistics and the opening hours editor, with a menu bar at the bottom',
				// The same frame as the admin overview beside it, so the two are equally tall.
				ratio: '1120 / 660',
				fit: 'contain',
			},
		],
	},
	{
		id: 'knee-training',
		title: 'Knee training app',
		period: 'March 2026',
		description:
			'When a knee injury got in the way of my marathon training I needed strength exercises, and I am not the best at knowing what to do at the gym. So I vibe-coded this guide to bring along: a weekly plan, every exercise with how to do it and what it should feel like, advice for the running, and a log for how the knee feels. It is in Swedish.',
		tags: ['HTML', 'CSS', 'JavaScript', 'Vibe-coded'],
		links: [
			{
				label: 'Open app',
				href: 'https://davidakerlind.github.io/knee_training_app/',
			},
			{
				label: 'Source',
				href: 'https://github.com/DavidAkerlind/knee_training_app',
			},
		],
		image: kneeStart,
		imageAlt:
			'The knee training app, in Swedish: a dark page with the title Knästyrka & löpschema, a week plan with gym, interval and running days, and tabs for the gym session, running, knee info and progress',
		gallery: [
			{
				src: kneeExercise,
				alt: 'The gym session in the app with one exercise opened, Terminal knee extension with a resistance band: why it matters, what equipment to use, how to do it and what it should feel like',
			},
			{
				src: kneePhone,
				alt: 'The app on three phone screens: the gym session, an opened exercise and the running tab',
			},
			{
				src: kneeRunning,
				alt: 'The running tab: advice to run on the forefoot, three kinds of training day, and tips on cadence, hip-driven running and a pain limit',
			},
			{
				src: kneeInfo,
				alt: 'The knee info tab, with an explanation of the injury, why forefoot running helps, the logic of the gym session and a timeline of the expected improvement',
			},
		],
	},
	{
		id: 'portfolio',
		title: 'This portfolio',
		period: '2026',
		description:
			'The site you are looking at: a simple, glassy React site with its own small design system, hosted on Cloudflare.',
		tags: ['React', 'Vite', 'CSS', 'Cloudflare', 'Constantly improving'],
		links: [
			{
				label: 'Source',
				href: 'https://github.com/DavidAkerlind/portfolio_page',
			},
		],
		image: portfolioHome,
		imageAlt:
			'The home page of this portfolio, with a glass header, the name David Åkerlind and a portrait photo',
	},
];
