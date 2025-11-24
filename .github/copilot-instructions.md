## Quick orientation for AI coding agents

This repo is a Vite + React + TypeScript single-page app (SPA) with TailwindCSS and Supabase as the primary backend.

- Entry points
  - App root: `src/main.tsx` → mounts `src/App.tsx`.
  - Routing: a tiny in-house router lives in `src/utils/router.tsx` (RouterProvider, useRouter, Route). Do NOT assume React Router; update routes by editing `src/App.tsx`.

- Data & types
  - Supabase client and all primary types are in `src/lib/supabase.ts`. Pages call `supabase.from('...')` directly (e.g., `HomePage`, `DashboardPage`). Use these types when changing data shapes.
  - Environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (accessed via `import.meta.env`) are required; the app throws if missing (see `src/lib/supabase.ts`).

- Build / dev / lint
  - Use package.json scripts: `npm run dev` (vite), `npm run build`, `npm run preview`, `npm run lint` (eslint), `npm run typecheck` (tsc via `tsconfig.app.json`). See `package.json` for exact commands.

- Styling
  - Tailwind is configured in `tailwind.config.js` and used via `index.css`.

- Conventions and patterns specific to this repo
  - Page components live under `src/pages/*` and are mounted in `src/App.tsx`. To add a page: create `src/pages/YourPage.tsx` and add a `<Route path="/your" component={<YourPage/>} />` in `src/App.tsx`.
  - Small, local router: navigation uses `useRouter().navigate('/path')`. Components expect this custom hook — search for `useRouter()` usage when changing navigation behavior.
  - Supabase queries often use `.select('*')` and client-side filtering. Consider using explicit selects and pagination for performance-sensitive lists.
  - UI uses Lucide icons (`lucide-react`) and Tailwind utilities — prefer consistent utility classes used in nearby components.

- Integration points & likely gotchas
  - Supabase: all queries are client-side in pages. Changing table names or schema requires updating both `src/lib/supabase.ts` types and every page that queries those tables (e.g., `HomePage.tsx`, `DashboardPage.tsx`, `SchoolsListPage.tsx`).
  - Router: path matching supports param segments like `/school/:projectCode` by a simple startsWith split — corner cases with similar prefixes may need careful handling.
  - Environment: developers should provide a `.env` file with VITE_* vars for local dev; CI must expose the same envs for preview/build steps.

- Where to look for examples
  - Data models/types: `src/lib/supabase.ts` (School, Donation, TeamMember, etc.).
  - Data usage patterns: `src/pages/HomePage.tsx` and `src/pages/DashboardPage.tsx` (examples of Promise.all, supabase queries, and client aggregation).
  - Routing and navigation: `src/App.tsx` and `src/utils/router.tsx`.

- Small guidance for edits
  - Prefer incremental changes: update the TypeScript types in `src/lib/supabase.ts` before adjusting pages that depend on them.
  - Keep UI patterns consistent: follow classnames & layout structure used in neighboring components (Header/Footer and page sections).
  - Run `npm run lint` and `npm run typecheck` after edits. The project uses TypeScript 5.x and Vite — avoid introducing non-ESM patterns.

If anything is unclear or you want more detail on a particular area (routing, supabase schema, CI/env), tell me which part and I will expand the instructions or add quick examples.
