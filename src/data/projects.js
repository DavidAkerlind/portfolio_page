import harpaviljongenStart from '../assets/projects/harpaviljongen-start.webp';
import harpaviljongenMenu from '../assets/projects/harpaviljongen-menu.webp';
import harpaviljongenInfo from '../assets/projects/harpaviljongen-info.webp';
import portfolioHome from '../assets/projects/portfolio-home.webp';

// Projects shown in the Projects section, in display order.
// `gallery` items are extra screenshots, shown cropped to the top of the page.
export const projects = [
	{
		id: 'harpaviljongen',
		title: 'Harpaviljongen',
		period: 'June 2025',
		description:
			'A complete website for a Stockholm restaurant: a public site and an admin panel where staff update menus and opening hours directly. Built with React and a REST API in Node.js on MongoDB.',
		tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
		links: [{ label: 'Visit site', href: 'https://www.harpaviljongen.com' }],
		image: harpaviljongenStart,
		imageAlt:
			'Harpaviljongen start page: a set table in a dim dining room with a green rabbit logo and a Boka bord (book a table) button',
		gallery: [
			{
				src: harpaviljongenMenu,
				alt: 'Harpaviljongen page with a photo of an oyster dish, Meny and Vinlista buttons, and links to Instagram and Facebook',
				caption: 'Menu, wine list and social links',
			},
			{
				src: harpaviljongenInfo,
				alt: 'Harpaviljongen opening hours, contact details, a map and a newsletter sign-up',
				caption: 'Opening hours, contact and map',
			},
		],
	},
	{
		id: 'portfolio',
		title: 'This portfolio',
		period: '2026',
		description:
			'The site you are looking at: a simple, glassy React site with its own small design system, hosted on Cloudflare.',
		tags: ['React', 'Vite', 'CSS', 'Cloudflare'],
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
