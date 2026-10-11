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

Routing uses real paths, no router library and no hashes: `/` is the site, `/styleguide` is the design system (preview only) and any other path is the not-found page. All of it is in `src/App.jsx`. Anchors such as `/#about` only scroll within a page.

- All tokens are CSS variables in `:root` in `src/index.css`: colors, glass, fonts, type scale, spacing, radii, layout, motion. Use them instead of hard-coded values.
- Every hover effect eases in and out over `--duration` (0.2s, `--ease`). Links and buttons get this from the base rule in `src/index.css`; a component that sets its own `transition` must list the properties its hover changes.
- Fonts: DM Serif Display for headings, DM Sans for body text, DM Mono for small labels (eyebrows, tags, buttons). They are loaded once in `index.html`. Do not `@import` fonts in CSS.
- Every page renders `<Backdrop />` once. Glass surfaces blur what is behind them, so they need it. It is as tall as the page and scrolls with it: the soft glows are placed in the `orbs` list in `Backdrop.jsx` (`top` is a share of the page height) and stay where they are put.
- Components in `src/components`: `Backdrop`, `GlassCard`, `Button`, `Tag`, `SectionHeading`, `PhotoFrame`, `VideoFrame`, `ProjectCard`, `Timeline`, `GlassLogo`, `TimerDisplay`, `Header`. Reuse these before writing new ones.
- The favicon is a bold glass "D" in `public/favicon.svg`, the same glass recipe as `GlassLogo`. `favicon-32.png` and `apple-touch-icon.png` (for Safari and iOS, which do not use SVG icons) are screenshots of it, so re-render them when the SVG changes.
- Red (`--color-timer`) is only for the marathon timer, and green (`--color-success`) only for the check on "signed up". Blue and slate are too dark for text.
- Images go in `src/assets/`, resized before committing (about 1600px wide at most, JPG or WebP), and always get `alt` text.
- Photos and videos from a phone carry GPS location, device and date metadata. Always strip it: re-encode photos (no EXIF) and encode video with `-map_metadata -1`, then check the output with `ffprobe`. Videos are short, silent loops (MP4 plus WebM, 720p, well under 1 MB each) in `src/assets/video/` with a poster image, shown with `VideoFrame`.

## Content

- The site is in English only.
- Do not publish the phone number from the CV. Contact is email, GitHub and LinkedIn.
- Personal photos and project screenshots come from the owner, or are taken from the live project sites.
- Projects live in `src/data/projects.js` (text, tags, links, screenshots from `src/assets/projects/`). To add a project, add an entry there; `ProjectsSection` renders them in order.
- The About section reads `src/data/about.js` (intro, education, experience, earlier work, skills, languages), translated from the CV. Update that file when the CV changes.
- Organisation logos are shown as colourless liquid glass by `GlassLogo` (only the shape is used, never the brand colours). Add a silhouette to `src/assets/logos/`: a white shape on a transparent square canvas (about 512px, WebP or SVG, artwork filling roughly 85%), made by thresholding the logo or by filling an SVG white. Then set it as `logo` on the entry in `about.js`.
- The "My interests" section reads `src/data/outside.js`: running (started in early 2026) and the marathon (official time 4:09:34 at Stockholm 2026; signed up for Stockholm Marathon 29 May 2027, 12:00 Stockholm time, which drives the live countdown), golf (photo), skateboarding (tre flip clip), rock climbing, travelling, family, and the two Lovable study tools (ML Playground, Stats Lab). Update the race date there after the race. Left out for now: piano and Strava stats.

## SEO and speed

- The title, description, canonical link and social tags for the home page are in `index.html`. The structured data (a `WebSite` and a `Person`, built from `src/data/links.js`) is added by `scripts/prerender.mjs`. Keep the facts in them in line with the site and the CV. Never put the email address or phone number in structured data.
- The share image is `public/og-image.jpg` (1200x630, no metadata). Remake it if the name, title or portrait changes.
- `public/robots.txt` and `public/sitemap.xml` list only `/`. A new public page must be added to the sitemap. Pages that must stay out of search results (`/styleguide`, the 404) get `noindex` from the prerender script and `public/_headers`.
- `public/_headers` sets the security headers and the long cache for the hashed files in `/assets/`.

## Hosting

The site is hosted on Cloudflare, not GitHub Pages.

- Cloudflare builds from this GitHub repo. The production branch is `main`; the build command is `npm run build` and the output directory is `dist`.
- A push to `main` deploys to production automatically. Other branches get their own preview URLs.
- DNS is on Cloudflare. The domain is registered at Spaceship. `www` redirects to the bare domain through a Cloudflare redirect rule.
- The `gh-pages` dependency, the `predeploy`/`deploy` scripts and the `CNAME` file are leftovers from GitHub Pages. Do not run `npm run deploy`.

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
