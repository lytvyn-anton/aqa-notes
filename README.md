# AQA Notes

A knowledge base web app for Automation QA engineers — built as a **Playwright portfolio project** to demonstrate real-world E2E test automation skills.

## Screenshots

| Login | Home |
|---|---|
| ![Login](docs/screenshots/login.png) | ![Home](docs/screenshots/home.png) |

| Search | Note |
|---|---|
| ![Search](docs/screenshots/search.png) | ![Note](docs/screenshots/note.png) |

## What this is

AQA Notes is a structured reference covering web, mobile, API, performance, and security test automation. The app itself is the **test target**: it provides realistic UI flows (auth, navigation, search, i18n) that serve as a meaningful playground for writing and showcasing Playwright tests.

**Live site:** https://aqa-notes.vercel.app

## Tech stack

| Layer | Technology |
|---|---|
| UI | React 19, TypeScript, Tailwind CSS |
| Routing | React Router v7 |
| i18n | i18next (English / Ukrainian) |
| Bundler | Vite |
| E2E tests | Playwright (Chromium, Firefox, WebKit) |
| Test management | Qase |
| CI | GitHub Actions |
| Containerization | Docker + nginx |

## Project structure

```
src/
├── components/       # Layout, CategoryCard, NoteCard, ProtectedRoute
├── context/          # AuthContext (login / logout)
├── data/             # categories, notes, automation-types (static content)
├── pages/            # HomePage, CategoryPage, NotePage, SearchPage, ...
├── locales/          # en.json, uk.json
└── test-ids.ts       # data-testid constants shared with E2E tests

tests/                # Playwright specs
.github/workflows/    # CI pipeline
```

## Credentials (demo)

| Email | Password | Role |
|---|---|---|
| admin@aqa.dev | aqa2024 | Admin |
| qa@aqa.dev | test1234 | QA Engineer |

## Running locally

```bash
npm install
npm run dev          # start dev server at http://localhost:5173
```

## Running E2E tests

```bash
# against local dev server (starts automatically)
npx playwright test

# headed mode for debugging
npx playwright test --headed

# Playwright UI mode
npx playwright test --ui

# against a deployed URL
BASE_URL=https://your-site.vercel.app npx playwright test
```

## Qase test management

Test cases are managed in [Qase (PWA project)](https://app.qase.io/project/PWA), organized into suites that mirror the app's feature areas.

Each Playwright test is linked to its Qase case via `qase.id()`:

```ts
import { qase } from 'playwright-qase-reporter/playwright'

test('login with valid credentials navigates to home', async ({ page }) => {
  qase.id(1)
  // ...
})
```

Results are reported to Qase only on manual trigger — see [Running against Qase](#running-against-qase) below.

## CI pipeline

Tests run automatically on every push and pull request to `main` across all three browsers (Chromium, Firefox, WebKit) via GitHub Actions matrix. Each browser runs as a separate job so failures are visible per browser.

See [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

## Running against Qase

To send results to a Qase test plan, trigger the workflow manually:

1. GitHub → **Actions** → **Playwright E2E** → **Run workflow**
2. Enter the Qase Plan ID in the input field
3. Results are reported to that plan with browser as a parameter

Required secret: `QASE_API_TOKEN` — add it in **Settings → Secrets → Actions**.

## Running with Docker

```bash
docker build -t aqa-notes .
docker run -p 8080:80 aqa-notes
# open http://localhost:8080
```

Or with Docker Compose:

```bash
docker compose up
# open http://localhost:8080
```

## Deploying

The app is a static Vite build — deploy anywhere that serves static files:

```bash
# Vercel (recommended)
npm i -g vercel
vercel

# Netlify
npm i -g netlify-cli
netlify deploy --prod --dir=dist

# Preview the production build locally
npm run build
npm run preview
```

## Portfolio notes

- `test-ids.ts` exports `TEST_IDS` constants used in both the app and tests — no magic strings
- Auth state is persisted in `localStorage` and protected routes redirect unauthenticated users
- The `BASE_URL` env var lets tests point at any environment without changing config
- CI uses `github` reporter so failures annotate the PR diff directly
