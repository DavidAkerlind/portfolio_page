import harpaviljongenStart from '../assets/projects/harpaviljongen-start.webp';
import harpaviljongenMenu from '../assets/projects/harpaviljongen-menu.webp';
import harpaviljongenInfo from '../assets/projects/harpaviljongen-info.webp';
import harpaviljongenAdmin from '../assets/projects/harpaviljongen-admin.webp';
import harpaviljongenAdminMobile from '../assets/projects/harpaviljongen-admin-mobile.webp';
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
