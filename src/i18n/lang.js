import { createContext, useContext } from 'react';
import { ui } from './ui';
import { getContent } from './content';

// The language of the page being rendered: 'en' for / and 'sv' for /sv/. It comes
// from the route (see App.jsx), never from the browser, so the prerendered HTML and
// the hydrated page always agree.
export const LangContext = createContext('en');

export const useLang = () => useContext(LangContext);

// The interface texts (buttons, labels, headings) in the page's language.
export const useUi = () => ui[useLang()];

// The site's content (projects, about, interests) in the page's language.
export const useContent = () => getContent(useLang());

export const homePath = (lang) => (lang === 'sv' ? '/sv/' : '/');

// Changes the language in place, without loading the page again. Only the home page
// (/ and /sv/) provides it; elsewhere it is null and a language link is an ordinary link.
export const LangSwitchContext = createContext(null);

export const useSwitchLang = () => useContext(LangSwitchContext);
