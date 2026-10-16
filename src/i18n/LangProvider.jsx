import { LangContext, LangSwitchContext } from './lang';

export function LangProvider({ lang, onSwitch = null, children }) {
	return (
		<LangContext value={lang}>
			<LangSwitchContext value={onSwitch}>{children}</LangSwitchContext>
		</LangContext>
	);
}
