import Backdrop from '../../components/Backdrop/Backdrop';
import Button from '../../components/Button/Button';
import './notFoundPage.css';

export default function NotFoundPage() {
	return (
		<>
			<Backdrop />

			<main className="container not-found">
				<span className="not-found-eyebrow">404</span>
				<h1 className="not-found-title">
					Page not <em>found</em>
				</h1>
				<p className="not-found-lead">
					There is nothing at this address. The start page has everything.
				</p>
				<Button href="/">Back to the start</Button>
			</main>
		</>
	);
}
