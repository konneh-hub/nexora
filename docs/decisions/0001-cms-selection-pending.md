# ADR 0001: Payload CMS and PostgreSQL

- **Status:** Accepted by explicit founder instruction
- **Date:** 2026-10-15
- **Decision owner:** Founder of Nexora Technologies

## Decision

Use **Payload CMS 3.90.2 with its official PostgreSQL adapter 3.90.2** as the CMS, admin UI, content model and persistent data layer for this Next.js application. The founder explicitly directed implementation without waiting for a proof of concept. This decision supersedes the earlier proof-of-concept gate.

The existing Next.js App Router application remains the public website. Payload owns its CMS schema, authentication tables, version tables, relationships and migrations. Do not create a parallel ORM schema for the same records.

## Compatibility baseline

- Next.js: existing pinned 16.4.0
- React / React DOM: existing pinned 19.3.0
- Payload and all `@payloadcms/*` packages: exact version 3.90.2 (keep them aligned)
- PostgreSQL: official Payload Drizzle adapter
- Node.js: 24.15.0 or newer compatible Node 24 release
- TypeScript: 6.0.3 or newer compatible TypeScript 6 release
- Database connection and Payload secret are environment-only; no production values belong in Git.

Payload's current installation documentation lists Node.js 24.15.0+, Next.js 16.4.0+ and TypeScript 6.0.3+. The official PostgreSQL adapter uses Drizzle and supports generated migrations. References: [Payload installation](https://payloadcms.com/docs/getting-started/installation), [PostgreSQL adapter](https://payloadcms.com/docs/database/postgres).

## Implemented configuration in this branch

- `payload.config.ts` defines user roles, pages, services, products, FAQs, media, portfolio, testimonials, enquiries, notification attempts, invitations, redirects, audit events and site settings.
- Payload's App Router admin/API routes are wired into the existing Next.js application.
- Public enquiry submission validates JSON, rejects unknown fields, requires at least one contact channel, separates marketing consent, persists the enquiry before creating a pending notification record, and avoids returning internal record details.
- Content publication has server-side access rules; portfolio/testimonial publication requires permission evidence; public informative media requires alt text and licence/ownership information.
- The initial physical migration still must be generated from the checked-in config using `npm run migrate:create`, reviewed and committed. No production database has been contacted or migrated.
- A committed `package-lock.json` and passing CI build/database tests remain required before this can be considered fully verified.

## Security and launch gates that remain

- Administrator MFA must be integrated and tested before launch; do not treat the current role field as MFA.
- Configure a real email provider and a retry worker for pending notification records.
- Add durable abuse/rate limiting and test it in the chosen deployment environment.
- Generate and review the initial Payload migration and test upgrade/recovery against disposable PostgreSQL.
- Verify first-admin bootstrap, invitation acceptance, session invalidation, last-administrator protection, append-only audit protections, published-only public queries, and role-denial tests.
- Review retention periods and legal/privacy content with qualified local advice before production.

## Consequences

The CMS is no longer an open choice. Future changes to the CMS, major version or database adapter require a separate reviewed decision. Keep all Payload packages on the same exact version and do not perform automatic major upgrades.
