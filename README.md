# Cypress Collab — Realtime Collaboration SaaS

An all-in-one collaboration and productivity platform built with Next.js 13, Supabase, Drizzle ORM, Stripe, Tailwind and websockets. This project demonstrates realtime cursors, rich-text collaboration, presence, payments, and a production-ready app structure designed for scale.

**Why this repo matters**: it bundles modern full‑stack patterns — App Router, server actions, realtime sockets, edge/webhook handling, and a payments flow — into a single, opinionated SaaS example you can learn from or fork for your own product.

**Highlights**
- **Realtime collaboration:** live cursors, selection, presence, and optimistic updates.
- **Rich-text editor:** custom Quill-based editor with collaboration hooks.
- **Payments + Billing:** Stripe checkout + customer portal integration.
- **Auth & Security:** custom authentication, 2FA/email invites, and Supabase row-level security.
- **Modern stack:** Next.js 13 (App Router), Drizzle ORM, TypeScript, Tailwind CSS.

**Quick links**
- Project root: [README.md](README.md)
- Environment: `.env` is ignored by default in `.gitignore` — do not commit secrets.

**Quickstart (local)**
1. Copy `.env.example` → `.env` and fill values (Supabase, Stripe, etc.).
2. Install dependencies:
```powershell
npm install
```
3. Run dev server:
```powershell
npm run dev
```
4. Open http://localhost:3000

Note: `.env` is included in `.gitignore` by default — confirm by checking `.gitignore`.

**Environment variables (typical)**
- `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_KEY`, `STRIPE_SECRET`, `WEBHOOK_SECRET`
- Database URL for Drizzle (e.g., `DATABASE_URL`)

Check `src/lib/` for specific providers and server actions that consume these variables.

**Architecture overview**
- Frontend: Next.js 13 App Router pages/components under `src/app` and `src/components`.
- Realtime: custom websocket/socket server and Supabase realtime for presence/events.
- DB: Drizzle ORM with SQL migrations in `migrations/`.
- Payments: Stripe checkout + customer portal endpoints under `src/app/api`.
- Email/2FA: server action-based templates and email templates in the repo root.

**Development notes**
- Keep secrets out of Git. `.env` is ignored — if a secret was pushed accidentally, remove it from history.
- Use `npm run dev` for local development; build with `npm run build`.
- Migrations live in `migrations/` — apply them to your database before running.

**Testing & Linting**
- Add and run tests as needed. This project scaffolds components and routes amenable to unit and integration tests.

**Deployment**
- Recommended: Vercel for the Next.js frontend; configure environment variables in the Vercel dashboard.
- Configure Stripe webhooks (point to `/api/webhook`) and secure them with `WEBHOOK_SECRET`.

**Contributing**
- Fork the repo, open a branch, and submit a PR. Keep changes focused per feature or fix.

**Contact & Credits**
- Author/maintainer: check repository owner on GitHub. Use issues for bugs and feature requests.

---

**Interview questions — 15 topics derived from this project**
1. How does Next.js 13 App Router differ from the Pages Router, and why choose it for a realtime app?
2. Explain how you would implement realtime cursors and selection synchronization across multiple clients.
3. Describe the trade-offs between using Supabase realtime vs a custom websocket server.
4. How does optimistic UI work? Give an example from a collaborative editor scenario.
5. How do you secure Stripe webhooks and verify their origin inside Next.js API routes?
6. What is Drizzle ORM and how does it compare to Prisma or TypeORM for SQL migrations and type safety?
7. How would you design row-level security policies in Supabase to support multi-tenant workspaces?
8. Explain strategies to prevent race conditions when multiple clients update the same document concurrently.
9. How do you handle presence (online/offline) and user cursors in the UI and backend?
10. What steps are needed to remove sensitive files (like `.env`) from a Git history after they've been pushed?
11. How do server actions in Next.js 13 help with handling payments and webhooks securely?
12. Explain how to implement role-based access control for workspace collaborators in this app.
13. How would you set up CI/CD for this project, including preview deployments and migration runs?
14. Discuss scaling realtime features: sticky sessions, message brokers, horizontal scaling concerns.
15. How would you implement a safe migration and rollback strategy for the database when deploying new features?

**Thanks!**



