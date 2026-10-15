import { LangContext } from './lang';

export function LangProvider({ lang, children }) {
	return <LangContext value={lang}>{children}</LangContext>;
}
