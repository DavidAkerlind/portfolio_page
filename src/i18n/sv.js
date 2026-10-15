// The Swedish text for everything in src/data. It is laid over the English data by
// content.js: a list of objects here is matched by `id` (objects keyed by id) or by
// position (plain lists), and only the keys listed here change.
export const sv = {
	projects: {
		harpaviljongen: {
			period: 'juni 2025',
			description:
				'En komplett hemsidelösning för en restaurang i Stockholm: en publik sida och en adminpanel där personalen själva uppdaterar menyer och öppettider. Jag stod för allt som tog den till produktion, från React-frontenden till REST-API:t i Node.js på MongoDB.',
			tags: ['React', 'Node.js', 'MongoDB', 'REST API', 'Ständigt uppdaterad'],
			links: [{ label: 'Besök sidan' }, { label: 'Källkod' }],
			imageAlt:
				'Harpaviljongens startsida: ett dukat bord i ett dunkelt matsalsrum med en grön harlogotyp och knappen Boka bord',
			gallery: [
				{
					alt: 'Harpaviljongens sida med ett foto av en ostronrätt, knapparna Meny och Vinlista samt länkar till Instagram och Facebook',
				},
				{
					alt: 'Harpaviljongens öppettider, kontaktuppgifter, en karta och ett nyhetsbrevsformulär',
				},
				{
					alt: 'Harpaviljongens adminpanel: en översikt med besökssiffror, driftstatus, senaste ändringar, öppettider och aktuella menyer',
				},
				{
					alt: 'Adminpanelen på tre telefonskärmar: översikten, besöksstatistik och redigering av öppettider, med en menyrad längst ner',
				},
			],
		},
		'knee-training': {
			title: 'Knäträningsapp',
			period: 'mars 2026',
			description:
				'När en knäskada kom i vägen för min maratonträning behövde jag styrkeövningar, och jag är inte bäst på att veta vad man ska göra på gymmet. Därför vibe-kodade jag den här guiden att ha med mig: ett veckoschema, varje övning med hur man gör den och hur den ska kännas, råd för löpningen och en logg för hur knäet mår. Appen är på svenska.',
			tags: ['HTML', 'CSS', 'JavaScript', 'Vibe-kodad'],
			links: [{ label: 'Öppna appen' }, { label: 'Källkod' }],
			imageAlt:
				'Knäträningsappen: en mörk sida med titeln Knästyrka & löpschema, ett veckoschema med gym-, intervall- och löpdagar samt flikar för gympass, löpning, knäinfo och framsteg',
			gallery: [
				{
					alt: 'Gympasset i appen med en övning öppnad, Terminal knee extension med gummiband: varför den är viktig, vilken utrustning som behövs, hur man gör den och hur den ska kännas',
				},
				{
					alt: 'Appen på tre telefonskärmar: gympasset, en öppnad övning och löpfliken',
				},
				{
					alt: 'Löpfliken: råd om att springa på framfoten, tre typer av träningsdagar och tips om kadens, höftdrivet löpande och smärtgräns',
				},
				{
					alt: 'Knäinfo-fliken, med en förklaring av skadan, varför framfotslöpning hjälper, gympassets logik och en tidslinje för förväntad förbättring',
				},
			],
		},
		portfolio: {
			title: 'Den här portfolion',
			description:
				'Sidan du tittar på just nu: en enkel, glasig React-sida med ett eget litet designsystem, hostad på Cloudflare.',
			tags: ['React', 'Vite', 'CSS', 'Cloudflare', 'Ständigt uppdaterad'],
			links: [{ label: 'Källkod' }],
			imageAlt:
				'Startsidan på den här portfolion, med ett glashuvud, namnet David Åkerlind och ett porträttfoto',
		},
	},

	intro:
		'Jag började med frontend-utveckling och gick vidare till artificiell intelligens. Jag är nyfiken, lär mig snabbt och drivs av att lösa problem och arbeta med modern teknik, och jag fungerar bra i team.',

	education: {
		'karlstad-university': {
			title: 'Datavetenskap, artificiell intelligens',
			place: 'Karlstads universitet',
			description:
				'Kandidatexamen (BSc). Jag har byggt en grund i programmering, datastrukturer, datorsystem och artificiell intelligens. Den här terminen ligger fokus på mjukvaruutveckling och optimering av AI.',
		},
		folkuniversitetet: {
			title: 'Frontend-utvecklare',
			description:
				'En tvåårig yrkeshögskoleutbildning: UI/UX, HTML och CSS, JavaScript, React och agila metoder. Jag lämnade efter ett år för att börja på min nuvarande AI-utbildning.',
		},
	},

	experience: {
		'cota-robotics': {
			title: 'Tech intern',
			period: 'juni – augusti 2026',
			description:
				'Praktik på ett robotikstartup som arbetar med att automatisera detaljhandeln. Det mesta av min tid gick till mjukvaruutveckling, men jag fick prova på många olika saker, från att lära mig om robotik och testning till att komma med egna idéer, och jag lärde mig mycket av teamet runt omkring mig. Jag hoppas få komma tillbaka nästa sommar.',
			points: [
				'Hjälpte till att utveckla robotarmar och programvara för datainsamling till AI-träning, inklusive 3D-printning.',
				'Konstruerade och byggde en pipeline som gör om video från butiker till ett punktmoln, med 3D-kartläggning av produkter och en 2D-karta över butikens planlösning.',
				'Cota var i ett tidigt skede då, med ett litet, sammansvetsat team.',
			],
		},
	},

	skills: [
		{ label: 'AI och data', items: ['Maskininlärning', 'scikit-learn', 'Hugging Face', 'Python'] },
		{
			label: 'Webb',
			items: ['JavaScript', 'React', 'HTML och CSS', 'Node.js', 'MongoDB'],
		},
		{ label: 'System', items: ['C', 'Assembly (MIPS)'] },
		{ label: 'Arbetssätt', items: ['Git', 'Agilt / Scrum'] },
	],

	marathon: {
		story:
			'Jag började springa i början av 2026. Jag är inte den snabbaste, men jag tycker verkligen om att ge mig ut på en runda då och då. Mina favoritrundor är de lugna långa, där man får se mycket och utforska nya platser.',
		finishAriaLabel: 'Officiell måltid: 4 timmar 9 minuter 34 sekunder',
		next: { startLabel: '29 maj 2027' },
	},

	alsoInto: ['Golf', 'Skateboard', 'Klättring', 'Resor', 'Natur', 'Segling', 'Familj'],

	studyTools: {
		title: 'Vibe-kodade studieverktyg',
		intro:
			'Jag gillar att bygga verktyg för att experimentera med det jag lär mig, så att jag kan förstå det på ett mer interaktivt och visuellt sätt. Mest arbetar jag med Claude Code och Lovable.',
		items: {
			'ml-playground': {
				period: 'Studieverktyg',
				description:
					'När jag lärde mig grunderna i maskininlärning och förstärkningsinlärning ville jag se vad som faktiskt händer när man ändrar parametrarna, inte bara titta på siffror. Därför vibe-kodade jag den här sidan, där jag kan styra ett scenario och se vad som händer. Testa gärna själv. Jag byggde på den steg för steg, från den första RL-sandlådan till flashcards, en generator för tentafrågor och fler ML-verktyg.',
				tags: ['Maskininlärning', 'Q-learning', 'Visualisering', 'Lovable'],
				links: [{ label: 'Öppna sidan' }],
				imageAlt:
					'ML Playground: en mörk instrumentpanel med ett FrozenLake-rutnät, reglage för träningsinställningar, en Q-tabell som värmekarta och diagram över belöning och framgångsgrad',
			},
			'stats-lab': {
				period: 'Studieverktyg',
				description:
					'Just nu läser jag statistik och ville ha hjälp med Venndiagram och ett snabbt sätt att få allt uträknat från en talmängd, från normalfördelningen till snitt och unioner, med grafer som hjälper mig att se sannolikheter och annat.',
				tags: ['Statistik', 'Sannolikhet', 'Visualisering', 'Lovable'],
				links: [{ label: 'Öppna sidan' }],
				imageAlt:
					'Stats Lab: två talmängder, mängd A och mängd B, som redigerbara värden med medelvärde, median, typvärde, varians och variationsbredd uträknade under',
			},
		},
	},
};
