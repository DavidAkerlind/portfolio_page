import { useEffect, useRef, useState } from 'react';
import '../PhotoFrame/photoFrame.css';
import './videoFrame.css';

/* A short silent looping clip in the same frame as PhotoFrame.
   It plays only while it is on screen, starts paused for visitors who prefer
   reduced motion, and always has a pause/play button. `sources` is a list of
   { src, type } so browsers can pick a format they support. `poster` is the still
   shown until it plays. `alt` describes the clip for screen readers. */
export default function VideoFrame({
	sources = [],
	poster,
	alt = '',
	caption,
	ratio = '16 / 9',
	position = 'center',
	className = '',
}) {
	const videoRef = useRef(null);
	const [visible, setVisible] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [paused, setPaused] = useState(
		() => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
	);

	useEffect(() => {
		const video = videoRef.current;
		const observer = new IntersectionObserver(
			([entry]) => setVisible(entry.isIntersecting),
			{ threshold: 0.25 },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (visible && !paused) {
			video.play().catch(() => {});
		} else {
			video.pause();
		}
	}, [visible, paused]);

	const toggle = () => setPaused((current) => !current);

	return (
		<figure className={`photo-frame ${className}`.trim()}>
			<div
				className="photo-frame-media video-frame-media"
				style={{ aspectRatio: ratio }}>
				<video
					ref={videoRef}
					poster={poster}
					aria-label={alt}
					style={{ objectPosition: position }}
					muted
					loop
					playsInline
					preload="metadata"
					onPlay={() => setPlaying(true)}
					onPause={() => setPlaying(false)}>
					{sources.map(({ src, type }) => (
						<source key={src} src={src} type={type} />
					))}
				</video>

				<button
					type="button"
					className="video-frame-toggle"
					aria-label={playing ? 'Pause video' : 'Play video'}
					onClick={toggle}>
					<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
						{playing ? (
							<path d="M4 3h3v10H4zM9 3h3v10H9z" />
						) : (
							<path d="M5 3l8 5-8 5z" />
						)}
					</svg>
				</button>
			</div>

			{caption && (
				<figcaption className="photo-frame-caption">{caption}</figcaption>
			)}
		</figure>
	);
}
