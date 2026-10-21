import { useMemo } from 'react';
import GooeyNav from '../GooeyNav/GooeyNav';
import { useActiveSection } from '../../lib/useActiveSection';
import { useSiteTheme } from '../../lib/useSiteTheme';

/* The header's links on a wide screen: the gooey navigation, with the item for the
   section being read selected (none above the first section). Loaded after the page
   is up and only on a wide screen (see Header.jsx). The shader needs the pill's
   colour as a number, so it is read from the page's own --color-lavender, for the
   theme that is showing, instead of being written down a second time. */
export default function HeaderGooey({ items, label }) {
	const [active, choose] = useActiveSection(items.map(({ href }) => href.slice(1)));
	const theme = useSiteTheme();
	// Only ever rendered in the browser, so reading the page's style here is safe.
	const colors = useMemo(() => {
		const probe = document.createElement('span');
		probe.style.color = 'var(--color-lavender)';
		document.body.append(probe);
		const pill = getComputedStyle(probe).color;
		probe.remove();
		return { pill, hover: pill.replace(/^rgb\(/, 'rgba(').replace(/\)$/, ', 0.14)') };
		// The colour changes with the theme.
	}, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<GooeyNav
			items={items}
			label={label}
			activeIndex={active}
			onChange={(index) => choose(index)}
			shadow={theme === 'light' ? 0.2 : 0.4}
			{...colors}
		/>
	);
}
