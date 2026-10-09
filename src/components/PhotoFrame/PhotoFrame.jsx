import './photoFrame.css';

/* A framed picture with a fixed aspect ratio, for personal photos and project
   screenshots. Without `src` it shows a placeholder, so layouts can be built first.
   Images load lazily; pass loading="eager" for the ones visible on first load.
   `position` is the CSS object-position used when the image is cropped to the ratio. */
export default function PhotoFrame({
	src,
	alt = '',
	caption,
	ratio = '4 / 3',
	placeholder = 'Photo coming soon',
	loading = 'lazy',
	position = 'center',
	className = '',
}) {
	return (
		<figure className={`photo-frame ${className}`.trim()}>
			<div className="photo-frame-media" style={{ aspectRatio: ratio }}>
				{src ? (
					<img
						src={src}
						alt={alt}
						loading={loading}
						style={{ objectPosition: position }}
					/>
				) : (
					<div
						className="photo-frame-placeholder"
						role="img"
						aria-label={alt || placeholder}>
						{placeholder}
					</div>
				)}
			</div>

			{caption && (
				<figcaption className="photo-frame-caption">{caption}</figcaption>
			)}
		</figure>
	);
}
