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
- Colors and fonts are CSS variables in `:root` in `src/index.css`. Use those variables instead of hard-coded values.

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
- Do not open a pull request, merge, or delete any branch unless asked. The owner decides when work is merged.
- If a request belongs on an existing branch, ask before adding commits to it.
- The flow is feature branch → `dev` → `main`. Merging into `main` deploys to production, so only do it when asked, and bring `dev` back in line with `main` afterwards.
- Run `npm run lint` and `npm run build` before pushing. Both must pass.
- Never force-push.
