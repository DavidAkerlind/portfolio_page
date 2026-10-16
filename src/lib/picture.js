// A picture with smaller copies beside it, for the `srcset` of an <img>: the phone
// that shows it 360px wide should not download the 1120px file. `name` is the file's
// path under src/assets without the extension, `fullWidth` the width of that file and
// `widths` the smaller copies, saved as `<name>-<width>.webp` next to it (see
// "Images" in CLAUDE.md). Returns { src, srcSet }; `src` is the full one, which is also
// what the enlarged view shows.
const files = import.meta.glob(
	['../assets/projects/*.webp', '../assets/tools/*.webp', '../assets/photos/david-portrait*.webp'],
	{ eager: true, query: '?url', import: 'default' },
);

const urlOf = (name, suffix = '') => {
	const url = files[`../assets/${name}${suffix}.webp`];
	if (!url) throw new Error(`No image at src/assets/${name}${suffix}.webp`);
	return url;
};

export function picture(name, fullWidth, widths) {
	const src = urlOf(name);
	const srcSet = [...widths.map((width) => `${urlOf(name, `-${width}`)} ${width}w`), `${src} ${fullWidth}w`].join(', ');
	return { src, srcSet };
}
