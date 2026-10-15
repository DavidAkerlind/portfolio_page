import { useSyncExternalStore } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import GlassCard from '../../components/GlassCard/GlassCard';
import Button from '../../components/Button/Button';
import Tag from '../../components/Tag/Tag';
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import VideoFrame from '../../components/VideoFrame/VideoFrame';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import TimerDisplay from '../../components/TimerDisplay/TimerDisplay';
import { marathon, activities, alsoInto, studyTools } from '../../data/outside';
import './outsideSection.css';

// The current time in whole seconds, ticking every second. `null` on the server and
// while hydrating, so the built page never holds a stale clock.
const subscribeToClock = (onChange) => {
	const id = setInterval(onChange, 1000);
	return () => clearInterval(id);
};
const readClock = () => Math.floor(Date.now() / 1000) * 1000;

// Milliseconds left until `target`, or null before the clock is known. Stops at zero.
function useTimeLeft(target) {
	const now = useSyncExternalStore(subscribeToClock, readClock, () => null);
	return now === null ? null : Math.max(0, new Date(target).getTime() - now);
}

function formatTimeLeft(ms) {
	// Before the clock is known every digit shows as an unlit cell.
	if (ms === null) {
		return { days: null, text: '---:--:--:--' };
	}

	const total = Math.floor(ms / 1000);
	const days = Math.floor(total / 86400);
	const hours = Math.floor((total % 86400) / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	const seconds = total % 60;
	const pad = (value, size = 2) => String(value).padStart(size, '0');

	return {
		days,
		text: `${pad(days, 3)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
	};
}

function CheckIcon() {
	return (
		<svg
			className="outside-check"
			viewBox="0 0 20 20"
			width="18"
			height="18"
			aria-hidden="true"
			focusable="false">
			<circle
				cx="10"
				cy="10"
				r="9"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M6 10.4l2.7 2.7L14 7.7"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function Marathon() {
	const { next } = marathon;
	const { days, text } = formatTimeLeft(useTimeLeft(next.start));

	return (
		<div className="marathon">
			<div className="marathon-text">
				<span className="outside-label">Running</span>
				<h3 className="outside-title">Stockholm Marathon</h3>
				<p className="outside-lead">{marathon.story}</p>
				<p className="outside-lead">
					My first marathon was the Stockholm Marathon in 2026, finished in an
					official 4 hours, 9 minutes and 34 seconds. I am already signed up for
					the next one on {next.startLabel}.
				</p>
				<Button href={next.href} variant="secondary">
					<CheckIcon />
					Signed up for 2027
				</Button>
			</div>

			<div className="marathon-timers">
				<TimerDisplay
					label={`My time · ${marathon.finishLabel}`}
					time={marathon.finishTime}
					caption="hours : minutes : seconds"
					ariaLabel={marathon.finishAriaLabel}
				/>
				<TimerDisplay
					label={`Next · ${next.label}`}
					time={text}
					caption="days : hours : minutes : seconds"
					ariaLabel={
							days === null
								? `Countdown to the ${next.name} on ${next.startLabel}`
								: `${days} ${days === 1 ? 'day' : 'days'} left until the ${next.name} on ${next.startLabel}`
						}
				/>
			</div>
		</div>
	);
}

function Activity({ title, text, photo, video }) {
	return (
		<GlassCard
			as="article"
			padded={false}
			className={`activity-card${photo ? ' activity-card-portrait' : ''}`}>
			{photo && (
				<PhotoFrame
					src={photo.src}
					alt={photo.alt}
					ratio="4 / 5"
					position="center 30%"
				/>
			)}
			{video && (
				<VideoFrame
					sources={video.sources}
					poster={video.poster}
					alt={video.alt}
					ratio="8 / 7"
				/>
			)}

			<div className="activity-body">
				<h3 className="activity-title">{title}</h3>
				<p className="activity-text">{text}</p>
			</div>
		</GlassCard>
	);
}

export default function OutsideSection() {
	return (
		<section
			id="interests"
			className="container outside"
			aria-labelledby="interests-title">
			<SectionHeading
				id="interests-title"
				eyebrow="03"
				title={
					<>
						My <em>interests</em>
					</>
				}>
				What I do away from the keyboard: running, golf and skateboarding, plus
				a few tools I build to learn.
			</SectionHeading>

			<Marathon />

			<div className="outside-block">
				{activities.length > 0 && (
					<div className="outside-activities">
						{activities.map((activity) => (
							<Activity key={activity.id} {...activity} />
						))}
					</div>
				)}

				<div className="outside-also">
					<span className="outside-label">Also</span>
					<ul className="tag-list">
						{alsoInto.map((item) => (
							<li key={item}>
								<Tag>{item}</Tag>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="outside-block">
				<div className="outside-intro">
					<span className="outside-label">Built to learn</span>
					<h3 className="outside-title">{studyTools.title}</h3>
					<p className="outside-lead">{studyTools.intro}</p>
				</div>

				<div className="outside-tools">
					{studyTools.items.map((tool) => (
						<ProjectCard key={tool.id} headingLevel={4} {...tool} />
					))}
				</div>
			</div>
		</section>
	);
}
