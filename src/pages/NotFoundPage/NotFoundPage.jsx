import Backdrop from '../../components/Backdrop/Backdrop';
import Button from '../../components/Button/Button';
import { homePath, useLang, useUi } from '../../i18n/lang';
import './notFoundPage.css';

export default function NotFoundPage() {
	const ui = useUi().notFound;
	const lang = useLang();

	return (
		<>
			<Backdrop />

			<main className="container not-found">
				<span className="not-found-eyebrow">404</span>
				<h1 className="not-found-title">
					{ui.title[0]}
					<em>{ui.title[1]}</em>
				</h1>
				<p className="not-found-lead">{ui.lead}</p>
				<Button href={homePath(lang)}>{ui.back}</Button>
			</main>
		</>
	);
}
