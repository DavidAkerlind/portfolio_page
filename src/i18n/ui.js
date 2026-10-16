// Interface texts, one block per language. The content of the site (projects,
// about, interests) is in src/data, with the Swedish versions in src/i18n/sv.js.
// Keep both blocks in the same shape.
const plural = (count, one, many) => (count === 1 ? one : many);

export const ui = {
	en: {
		htmlLang: 'en',
		header: {
			nav: [
				{ label: 'Projects', href: '#projects' },
				{ label: 'About', href: '#about' },
				{ label: 'Interests', href: '#interests' },
				{ label: 'Contact', href: '#contact' },
			],
			navLabel: 'Main',
			menu: 'Menu',
			close: 'Close',
		},
		theme: {
			toggle: 'Switch between light and dark mode',
			toLight: 'Switch to light mode',
			toDark: 'Switch to dark mode',
		},
		hero: {
			eyebrow: 'Computer Science · Artificial Intelligence',
			lead: 'I have always liked technology and building things. A few years ago I realised I had no idea how the tools I used every day were built, so I started to learn. That led me into programming, system development and AI.',
			projects: 'See my projects',
			contact: 'Get in touch',
			portraitAlt:
				'David Åkerlind smiling on the deck of a boat, with a lake and forest behind',
		},
		projects: { title: ['Selected ', 'projects'] },
		about: {
			title: ['About ', 'me'],
			education: 'Education',
			experience: 'Experience',
			skills: 'Skills',
		},
		interests: {
			title: ['My ', 'interests'],
			running: 'Running',
			marathonTitle: 'Stockholm Marathon',
			firstMarathon:
				'My first marathon was the Stockholm Marathon in 2026, a really fun race that I get to experience again in 2027, which I am looking forward to a lot.',
			signedUp: 'Signed up for 2027',
			myTime: 'My time',
			next: 'Next',
			finishCaption: 'hours : minutes : seconds',
			countdownCaption: 'days : hours : minutes : seconds',
			countdownAria: (name, startLabel) =>
				`Countdown to the ${name} on ${startLabel}`,
			daysLeftAria: (days, name, startLabel) =>
				`${days} ${plural(days, 'day', 'days')} left until the ${name} on ${startLabel}`,
			also: 'Also',
			builtToLearn: 'Built to learn',
		},
		contact: {
			title: ['Get in ', 'touch'],
			lead: 'Have a question, an idea or something you would like to build? Email is the quickest way to reach me. You can also find me on GitHub and LinkedIn.',
			email: 'Email',
		},
		footer: {
			elsewhere: 'Elsewhere',
			email: 'Email',
			top: 'Back to top',
			language: 'Language',
		},
		photo: {
			placeholder: 'Photo coming soon',
			screenshotPlaceholder: 'Screenshot coming soon',
			enlarge: 'Enlarge picture',
			enlarged: 'Enlarged picture',
			close: 'Close',
		},
		video: { pause: 'Pause video', play: 'Play video' },
		notFound: {
			title: ['Page not ', 'found'],
			lead: 'There is nothing at this address. The start page has everything.',
			back: 'Back to the start',
		},
	},

	sv: {
		htmlLang: 'sv',
		header: {
			nav: [
				{ label: 'Projekt', href: '#projects' },
				{ label: 'Om mig', href: '#about' },
				{ label: 'Intressen', href: '#interests' },
				{ label: 'Kontakt', href: '#contact' },
			],
			navLabel: 'Huvudmeny',
			menu: 'Meny',
			close: 'Stäng',
		},
		theme: {
			toggle: 'Växla mellan ljust och mörkt läge',
			toLight: 'Byt till ljust läge',
			toDark: 'Byt till mörkt läge',
		},
		hero: {
			eyebrow: 'Datavetenskap · Artificiell intelligens',
			lead: 'Jag har alltid gillat teknik och att bygga saker. För några år sedan insåg jag att jag inte hade någon aning om hur verktygen jag använde varje dag var byggda, så jag började lära mig. Det ledde mig in på programmering, systemutveckling och AI.',
			projects: 'Se mina projekt',
			contact: 'Hör av dig',
			portraitAlt:
				'David Åkerlind ler på däcket på en båt, med en sjö och skog bakom sig',
		},
		projects: { title: ['Utvalda ', 'projekt'] },
		about: {
			title: ['Om ', 'mig'],
			education: 'Utbildning',
			experience: 'Erfarenhet',
			skills: 'Kompetenser',
		},
		interests: {
			title: ['Mina ', 'intressen'],
			running: 'Löpning',
			marathonTitle: 'Stockholm Marathon',
			firstMarathon:
				'Mitt första maraton var i Stockholm Marathon 2026, ett superroligt lopp som jag får uppleva igen 2027, det ser jag mycket fram emot.',
			signedUp: 'Anmäld till 2027',
			myTime: 'Min tid',
			next: 'Nästa',
			finishCaption: 'timmar : minuter : sekunder',
			countdownCaption: 'dagar : timmar : minuter : sekunder',
			countdownAria: (name, startLabel) =>
				`Nedräkning till ${name} den ${startLabel}`,
			daysLeftAria: (days, name, startLabel) =>
				`${days} ${plural(days, 'dag', 'dagar')} kvar till ${name} den ${startLabel}`,
			also: 'Dessutom',
			builtToLearn: 'Byggt för att lära',
		},
		contact: {
			title: ['Hör ', 'av dig'],
			lead: 'Har du en fråga, en idé eller något du vill bygga? E-post är det snabbaste sättet att nå mig. Du hittar mig också på GitHub och LinkedIn.',
			email: 'E-post',
		},
		footer: {
			elsewhere: 'Hitta mig online',
			email: 'E-post',
			top: 'Till toppen',
			language: 'Språk',
		},
		photo: {
			placeholder: 'Foto kommer snart',
			screenshotPlaceholder: 'Skärmbild kommer snart',
			enlarge: 'Förstora bilden',
			enlarged: 'Förstorad bild',
			close: 'Stäng',
		},
		video: { pause: 'Pausa videon', play: 'Spela upp videon' },
		notFound: {
			title: ['Sidan hittades ', 'inte'],
			lead: 'Det finns inget på den här adressen. Startsidan har allt.',
			back: 'Tillbaka till start',
		},
	},
};
