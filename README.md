# qa-showcase — QA Engineer Portfolio + Skills Web App

Modern portfolio website for **Oleksandr Pyavchyk** with:
- CV-like homepage (`/`)
- Interactive Skills Web App (`/skills/*`)
- Coverage map (`/coverage`)
- Evidence loading from repo artifacts (`docs`, `sql`, `bugs`, `tracker`, `api-tests`)

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- motion/react (Framer Motion runtime)
- lucide-react icons
- react-markdown

## Routes
- `/` Home CV
- `/skills`
- `/skills/architecture`
- `/skills/web-protocols`
- `/skills/api`
- `/skills/db`
- `/skills/logs`
- `/skills/process`
- `/skills/bugs`
- `/skills/tracker`
- `/coverage`

## Project Evidence Structure
- Architecture: `docs/architecture/`
- Web/HTML5: `docs/web-protocols/`
- API: `docs/api/`, `api-tests/`
- SQL/DB: `docs/db/`, `sql/`
- Logs/Kibana: `docs/logs/`
- QA docs: `docs/process/`, `bugs/`
- Trackers: `tracker/`

## Install & Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build
```bash
npm run build
npm run start
```

## Content Index
Generated into `public/content-index.json` by:
```bash
npm run gen:index
```

## Deploy to Vercel
1. Push repo to GitHub
2. Import project in Vercel
3. Build command: `npm run build`
4. Output: Next.js default

## Links to update
- GitHub: replace `<PUT_GITHUB_URL_HERE>` in `app/page.tsx`
- LinkedIn: replace `<PUT_LINKEDIN_URL_HERE>` in `app/page.tsx`
