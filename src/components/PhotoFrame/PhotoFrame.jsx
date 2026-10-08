import './photoFrame.css';

/* A framed picture with a fixed aspect ratio, for personal photos and project
   screenshots. Without `src` it shows a placeholder, so layouts can be built first. */
export default function PhotoFrame({
	src,
	alt = '',
	caption,
	ratio = '4 / 3',
	placeholder = 'Photo coming soon',
	className = '',
}) {
	return (
		<figure className={`photo-frame ${className}`.trim()}>
			<div className="photo-frame-media" style={{ aspectRatio: ratio }}>
				{src ? (
					<img src={src} alt={alt} loading="lazy" />
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
