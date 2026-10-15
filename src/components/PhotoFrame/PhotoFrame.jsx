import { useEffect, useRef, useState } from 'react';
import './photoFrame.css';

/* The enlarged picture: a native modal <dialog>, so Escape closes it, focus stays
   inside it and goes back to the picture afterwards. A click anywhere closes it too.
   It is only rendered once opened, so the built page holds no dialog. */
function Lightbox({ src, alt, onClose }) {
	const dialog = useRef(null);

	useEffect(() => {
		dialog.current?.showModal();
	}, []);

	return (
		<dialog
			ref={dialog}
			className="lightbox"
			aria-label={alt || 'Enlarged picture'}
			onClose={onClose}
			onClick={() => dialog.current?.close()}>
			<img className="lightbox-image" src={src} alt={alt} />
			<button type="button" className="lightbox-close" aria-label="Close">
				<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
					<path
						d="M5 5l10 10M15 5L5 15"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</svg>
			</button>
		</dialog>
	);
}

function ExpandIcon() {
	return (
		<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false">
			<path
				d="M12 3h5v5M8 17H3v-5M17 3l-5.5 5.5M3 17l5.5-5.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/* A framed picture with a fixed aspect ratio, for personal photos and project
   screenshots. Without `src` it shows a placeholder, so layouts can be built first.
   Images load lazily; pass loading="eager" (and fetchPriority="high" for the main
   one) for the ones visible on first load.
   `position` is the CSS object-position used when the image is cropped to the ratio.
   `zoomable` makes the picture a button that opens it uncropped and enlarged. */
export default function PhotoFrame({
	src,
	alt = '',
	caption,
	ratio = '4 / 3',
	placeholder = 'Photo coming soon',
	loading = 'lazy',
	fetchPriority,
	position = 'center',
	zoomable = false,
	className = '',
}) {
	const [open, setOpen] = useState(false);

	const image = (
		<img
			src={src}
			alt={alt}
			loading={loading}
			fetchPriority={fetchPriority}
			decoding="async"
			style={{ objectPosition: position }}
		/>
	);

	return (
		<figure className={`photo-frame ${className}`.trim()}>
			<div className="photo-frame-media" style={{ aspectRatio: ratio }}>
				{!src && (
					<div
						className="photo-frame-placeholder"
						role="img"
						aria-label={alt || placeholder}>
						{placeholder}
					</div>
				)}

				{src && !zoomable && image}

				{src && zoomable && (
					<button
						type="button"
						className="photo-frame-zoom"
						aria-label="Enlarge picture"
						aria-haspopup="dialog"
						onClick={() => setOpen(true)}>
						{image}
						<span className="photo-frame-zoom-icon">
							<ExpandIcon />
						</span>
					</button>
				)}
			</div>

			{caption && (
				<figcaption className="photo-frame-caption">{caption}</figcaption>
			)}

			{open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
		</figure>
	);
}
