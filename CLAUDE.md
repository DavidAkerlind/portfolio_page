# Portfolio page

Personal portfolio site for David Åkerlind, live at https://davidakerlind.com.

## Stack and commands

React 19 + Vite 7, plain CSS, no router, no test suite.

- `npm run dev` – local dev server
- `npm run lint` – ESLint
- `npm run build` – production build into `dist/`
- `npm run preview` – serve the production build locally

## Code conventions

Match the surrounding code. The hand-written files use tabs, single quotes and semicolons.

- Components live in `src/components/<Name>/<Name>.jsx` with a CSS file beside them.
- Pages live in `src/pages/<Name>/`, the same way.

## Design system

Glassmorphism on a dark navy backdrop, kept simple. Open `/#styleguide` (run `npm run dev`, or use a Cloudflare preview URL) to see every token and component. Update that page when adding or changing a component.

- All tokens are CSS variables in `:root` in `src/index.css`: colors, glass, fonts, type scale, spacing, radii, layout, motion. Use them instead of hard-coded values.
- Fonts: DM Serif Display for headings, DM Sans for body text, DM Mono for small labels (eyebrows, tags, buttons). They are loaded once in `index.html`. Do not `@import` fonts in CSS.
- Every page renders `<Backdrop />` once. Glass surfaces blur what is behind them, so they need it.
- Components in `src/components`: `Backdrop`, `GlassCard`, `Button`, `Tag`, `SectionHeading`, `PhotoFrame`, `ProjectCard`, `TimerDisplay`. Reuse these before writing new ones.
- Red (`--color-timer`) is only for the marathon timer. Blue and slate are too dark for text.
- Images go in `src/assets/`, resized before committing (about 1600px wide at most, JPG or WebP), and always get `alt` text.

## Content

- The site is in English only.
- Do not publish the phone number from the CV. Contact is email, GitHub and LinkedIn.
- Personal photos and project screenshots come from the owner, or are taken from the live project sites.

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
