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
