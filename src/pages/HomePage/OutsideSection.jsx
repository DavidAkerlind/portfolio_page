import { useSyncExternalStore } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import GlassCard from '../../components/GlassCard/GlassCard';
import Button from '../../components/Button/Button';
import Tag from '../../components/Tag/Tag';
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import VideoFrame from '../../components/VideoFrame/VideoFrame';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import TimerDisplay from '../../components/TimerDisplay/TimerDisplay';
import { activities } from '../../data/outside';
import { useContent, useUi } from '../../i18n/lang';
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
	const { marathon } = useContent();
	const ui = useUi().interests;
	const { next } = marathon;
	const { days, text } = formatTimeLeft(useTimeLeft(next.start));

	return (
		<div className="marathon">
			<div className="marathon-text">
				<span className="outside-label">{ui.running}</span>
				<h3 className="outside-title">{ui.marathonTitle}</h3>
				<p className="outside-lead">{marathon.story}</p>
				<p className="outside-lead">{ui.firstMarathon}</p>
				<Button href={next.href} variant="secondary">
					<CheckIcon />
					{ui.signedUp}
				</Button>
			</div>

			<div className="marathon-timers">
				<TimerDisplay
					label={`${ui.myTime} · ${marathon.finishLabel}`}
					time={marathon.finishTime}
					caption={ui.finishCaption}
					ariaLabel={marathon.finishAriaLabel}
				/>
				<TimerDisplay
					label={`${ui.next} · ${next.label}`}
					time={text}
					caption={ui.countdownCaption}
					ariaLabel={
						days === null
							? ui.countdownAria(next.name, next.startLabel)
							: ui.daysLeftAria(days, next.name, next.startLabel)
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
	const { alsoInto, studyTools } = useContent();
	const ui = useUi().interests;

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
						{ui.title[0]}
						<em>{ui.title[1]}</em>
					</>
				}
			/>

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
					<span className="outside-label">{ui.also}</span>
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
					<span className="outside-label">{ui.builtToLearn}</span>
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
