# Portfolio page

Personal portfolio site for David Åkerlind, live at https://davidakerlind.com.

## Stack and commands

React 19 + Vite 7, plain CSS, no router, no test suite.

- `npm run dev` – local dev server
- `npm run lint` – ESLint
- `npm run build` – production build into `dist/`: a client build, a server build, then `scripts/prerender.mjs` renders each page to static HTML (`dist/index.html`, `dist/styleguide/index.html`, `dist/404.html`) so the pages are readable without JavaScript and React only hydrates them
- `npm run preview` – serve the production build locally

## Code conventions

- Pages are rendered on the server at build time, so never read `window`, `document`, `Date.now()` or `matchMedia` while rendering. Do it in an effect, or with `useSyncExternalStore` and a server snapshot (see `VideoFrame` and the countdown in `OutsideSection`). Otherwise hydration fails.
- Add a new page to `PAGES` in `src/App.jsx` and to `pages` in `scripts/prerender.mjs`.

Match the surrounding code. The hand-written files use tabs, single quotes and semicolons.

- Components live in `src/components/<Name>/<Name>.jsx` with a CSS file beside them.
- Pages live in `src/pages/<Name>/`, the same way.

## Design system

Glassmorphism on a dark navy backdrop, kept simple. Open `/styleguide` (run `npm run dev`, or use a Cloudflare preview URL) to see every token and component. Update that page when adding or changing a component.

Routing uses real paths, no router library and no hashes: `/` is the site, `/sv/` is the same site in Swedish, `/styleguide` is the design system (preview only) and any other path is the not-found page (English, one static file for every address). All of it is in `src/App.jsx`. Anchors such as `/#about` only scroll within a page.

- All tokens are CSS variables in `:root` in `src/index.css`: colors, glass, fonts, type scale, spacing, radii, layout, motion. Use them instead of hard-coded values.
- Light and dark mode: every color token is a `light-dark(light, dark)` pair, and `color-scheme: light dark` makes the page follow the device. The `ThemeToggle` in the header overrides it with `data-theme` on `<html>` (saved in `localStorage`; a small inline script in `index.html` applies it before the first paint). Never hard-code a color: add a `light-dark()` token. Things that sit on photos or video (the zoom chip, the video button, the enlarged picture, the timer screens) stay dark in both modes on purpose. Check both modes after any visual change (Playwright `colorScheme: 'light'` and `'dark'`).
- Every hover effect eases in and out (`--ease`). Cards, buttons and whole segments take `--duration` (0.3s) and text links take `--duration-link` (0.2s). Plain links and `<button>`s get this from the base rules in `src/index.css`; a component that sets its own `transition` (the glass card, `Button`, the contact link) must list the properties its hover changes, and uses `--duration` unless it is a text link.
- Reduced motion (`prefers-reduced-motion`) switches off what moves: the entrance and drift animations, the browser's own smooth scrolling and any hover that moves something (the contact arrow). The one exception, by the owner's choice, is the click-to-scroll glide below. It must not switch off hover colour fades; a blanket `transition-duration: 0.01ms` rule once did, which made every hover snap for anyone with animations turned off in their OS. Test both modes (Playwright `reducedMotion: 'reduce'`) after changing hover effects.
- Links to a place on the same page (`#projects`, `#top`) glide there in about a second, easing in and out, through `src/lib/smoothScroll.js` (started in `App.jsx`). The browser's own `scroll-behavior: smooth` stays as the fallback without JavaScript. It also runs when reduced motion is on, because the owner asked for it (a click starts it and any scroll input stops it).
- Fonts: DM Serif Display for headings, DM Sans for body text, DM Mono for small labels (eyebrows, tags, buttons). They are self-hosted with the `@fontsource` packages, imported once in `src/main.jsx` (Latin sets, only the weights the design uses), and `scripts/prerender.mjs` preloads the main ones. Do not load fonts from Google or any other third party.
- Every page renders `<Backdrop />` once. Glass surfaces blur what is behind them, so they need it. It is as tall as the page but moves slower than the page scrolls (`--parallax` in `backdrop.css`, 0.4 = two fifths of the scroll speed), so it feels far away; the glows move with it. Browsers with scroll-driven animations do this in CSS alone, the others get the same movement from a scroll listener in `Backdrop.jsx`, and `#root` clips the layer so the page never gets longer. The soft glows are placed in the `orbs` list in `Backdrop.jsx` (`top` is a share, 0 to 1, of the part of the backdrop that can ever be seen). Each glow also floats on its own, very slowly (a sideways sway and a bob with a gentle swell, different distances and times per glow, set in the `orbs` list). The parallax and the float both keep running with reduced motion on, by the owner's choice (`backdrop.css` exempts them from the global reduced-motion rule). In light mode the glows are vivid blues at `--glow-opacity` 0.48.
- Components in `src/components`: `Backdrop`, `GlassCard`, `Button`, `Tag`, `SectionHeading`, `PhotoFrame`, `VideoFrame`, `ProjectCard`, `Timeline`, `GlassLogo`, `TimerDisplay`, `ContactLink`, `ThemeToggle`, `Header`, `Footer`. Reuse these before writing new ones.
- The favicon is a bold glass "D" in `public/favicon.svg`, the same glass recipe as `GlassLogo`. `favicon-32.png` and `apple-touch-icon.png` (for Safari and iOS, which do not use SVG icons) are screenshots of it, so re-render them when the SVG changes.
- Red (`--color-timer`) is only for the marathon timer, and green (`--color-success`) only for the check on "signed up". Blue and slate are too dark for text.
- Project screenshots are `zoomable` (`PhotoFrame`): a click opens the uncropped picture in a native `<dialog>`, which Escape or a click closes. Use it for any screenshot a visitor may want to read.
- Images go in `src/assets/`, as WebP, resized before committing to about twice the width they are shown at (screenshots 1120px wide at most, photos 800 to 900px), and always get `alt` text.
- Photos and videos from a phone carry GPS location, device and date metadata. Always strip it: re-encode photos (no EXIF) and encode video with `-map_metadata -1`, then check the output with `ffprobe`. Videos are short, silent loops (MP4 plus WebM, 720p, well under 1 MB each) in `src/assets/video/` with a poster image, shown with `VideoFrame`.

## Content

- The site is in English (`/`) and Swedish (`/sv/`); the footer has the language choice and never redirects by browser language. English is the source. Every text lives in one of three places, and each has a Swedish twin: the content in `src/data/*.js` (Swedish in `src/i18n/sv.js`, laid over the English by `id` or position, only text is translated), the interface texts in `src/i18n/ui.js` (an `en` and an `sv` block in the same shape), and the page's title and description in `scripts/prerender.mjs`. Change a text, change both languages. Components read them with `useUi()` and `useContent()` from `src/i18n/lang.js`; the language comes from the route, never from `navigator`. `/styleguide` and the 404 stay English.
- Do not publish the phone number from the CV. Contact is email, GitHub and LinkedIn. The Contact section (`ContactSection.jsx`) and the footer both read the addresses from `src/data/links.js`; there is no contact form, because the site is static and has no backend.
- Personal photos and project screenshots come from the owner, or are taken from the live project sites.
- Projects live in `src/data/projects.js` (text, tags, links, screenshots from `src/assets/projects/`). To add a project, add an entry there; `ProjectsSection` renders them in order.
- The About section reads `src/data/about.js` (intro, education, experience, skills), translated from the CV. Update that file when the CV changes.
- Organisation logos are shown as colourless liquid glass by `GlassLogo` (only the shape is used, never the brand colours). Add a silhouette to `src/assets/logos/`: a white shape on a transparent square canvas (about 256px, WebP or SVG, artwork filling roughly 85%), made by thresholding the logo or by filling an SVG white. Then set it as `logo` on the entry in `about.js`.
- The "My interests" section reads `src/data/outside.js`: running (started in early 2026) and the marathon (official time 4:09:34 at Stockholm 2026; signed up for Stockholm Marathon 29 May 2027, 12:00 Stockholm time, which drives the live countdown), golf, skateboarding, rock climbing, travelling and family (all under "Also"; the golf photo and tre flip clip cards are commented out in `outside.js`, ready to come back), and the two Lovable study tools (ML Playground, Stats Lab). Update the race date there after the race. Left out for now: piano and Strava stats.

## SEO and speed

- The title, description, canonical link and social tags for the home page are in `index.html`. The structured data (a `WebSite` and a `Person`, built from `src/data/links.js`) is added by `scripts/prerender.mjs`. Keep the facts in them in line with the site and the CV. Never put the email address or phone number in structured data.
- The share image is `public/og-image.jpg` (1200x630, no metadata). Remake it if the name, title or portrait changes.
- `public/robots.txt` and `public/sitemap.xml` list `/` and `/sv/`, each with `hreflang` alternates (also set in `index.html`; the prerender script swaps the Swedish title, description, canonical and locale into `dist/sv/index.html`). The share image still has English text on it. A new public page must be added to the sitemap. Pages that must stay out of search results (`/styleguide`, the 404) get `noindex` from the prerender script and `public/_headers`.
- `public/_headers` sets the security headers and the long cache for the hashed files in `/assets/`.
- Keep the page free of third-party requests, and keep the first load small: the prerender inlines the page's CSS, React is its own cached chunk, below-the-fold images load lazily, the video loads only when it is on screen (`preload="none"`) and the hero photo has `fetchPriority="high"`. Check with Lighthouse (mobile) after bigger changes; it scored 94 for performance and 100 for accessibility, best practices and SEO when this was set up.

## Hosting

The site is hosted on Cloudflare, not GitHub Pages.

- Cloudflare builds from this GitHub repo. The production branch is `main`; the build command is `npm run build` and the output directory is `dist`.
- A push to `main` deploys to production automatically. Other branches get their own preview URLs.
- DNS is on Cloudflare. The domain is registered at Spaceship. `www` redirects to the bare domain through a Cloudflare redirect rule.
- `.node-version` pins Node 22 for the Cloudflare build (Vite 7 needs at least 20.19). There is no deploy script: the old GitHub Pages leftovers (`gh-pages`, `predeploy`/`deploy` and `CNAME`) are gone, so never add a way to deploy from a laptop.

## Git workflow

Branches are `main` and `dev`, plus one short-lived branch per piece of work.

- **Never work directly on `main` or `dev`.** Create a branch for every task, from `dev`.
- **Name branches `<number>-<what-it-does>`**: lowercase, words separated by hyphens, for example `7-updating-font` or `8-add-projects-section`. The number is the GitHub issue number when there is one; otherwise use the next free number across issues and pull requests. Never use generated names like `claude/abc123`.
- Make small commits with descriptive messages, and push the branch to `origin`.
- When a branch is finished and `npm run lint` and `npm run build` pass, merge it into `dev` yourself (`git merge --no-ff`) and push `dev`.
- **Never merge into `main`.** The owner does that when ready, because it deploys to production.
- Do not open a pull request or delete any branch unless asked.
- If a request belongs on an existing branch, ask before adding commits to it.
- Run `npm run lint` and `npm run build` before pushing. Both must pass.
- Never force-push.
