import GlassCard from '../GlassCard/GlassCard';
import './timerDisplay.css';

/* A glowing red digital timer, e.g. a race finish time.
   Pass the time as text: '04:09' or '04:09:12'. */
export default function TimerDisplay({ time, label, caption, ariaLabel }) {
	return (
		<GlassCard as="figure" className="timer">
			{label && <figcaption className="timer-label">{label}</figcaption>}

			<div className="timer-digits" role="img" aria-label={ariaLabel ?? time}>
				{time}
			</div>

			{caption && <p className="timer-caption">{caption}</p>}
		</GlassCard>
	);
}
