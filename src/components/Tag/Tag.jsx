import './tag.css';

/* A small pill for technologies and labels. Wrap several in <ul className="tag-list">. */
export default function Tag({ children }) {
	return <span className="tag">{children}</span>;
}
