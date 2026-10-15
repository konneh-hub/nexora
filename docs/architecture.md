# Architecture — Nexora Technologies Website

**Status:** Payload CMS 3.90.2 with PostgreSQL is selected by explicit founder instruction; the physical migration and CI verification are still pending.

## System boundaries

- The public Next.js App Router website serves marketing pages and validated enquiry forms.
- A protected CMS is the source of truth for editable page, service, product, FAQ, navigation, footer and site-setting content.
- Payload CMS stores structured content, users, workflow/version history and enquiry records in PostgreSQL through its official Drizzle adapter.
- Media belongs in S3-compatible object storage; private operational files must not be exposed through public media URLs.
- A transactional email provider sends notifications after an enquiry is durably stored.
- The admin interface is private, has no public registration, and enforces permissions on the server for every operation.

## Request flows

### Public content
1. Resolve a route or slug.
2. Retrieve only content whose status is `Published`.
3. Render using code-controlled templates and brand tokens.
4. Return a proper 404 for missing or unpublished slugs.
5. Refresh cached content after publishing; the target is under 60 seconds.

### Enquiry submission
1. Validate and normalise the request on the server; reject unknown fields.
2. Apply rate limits and spam controls.
3. Persist the enquiry before attempting email.
4. Return confirmation only after persistence succeeds.
5. Send a notification and record delivery state. A notification failure must not discard the enquiry and must be visible to authorised handlers.

### Administration
1. Require an authenticated session and server-side role permission.
2. Require MFA for Administrators.
3. Check permission again in every route handler, CMS access rule and mutation.
4. Record security-sensitive actions in an append-only audit log without storing passwords, tokens or unnecessary personal data.

## Required environment boundaries

- Separate staging and production resources and credentials.
- Environment variable names only in `.env.example`; no real values in Git.
- Production database migrations are reviewed, reversible and run only through the approved deployment process.
- Development seed data is synthetic and never copied from real enquiries.
- Public pages should remain available from a safe cache/static output during CMS interruption where supported by the selected implementation.

## Decisions still open

- Hosting, PostgreSQL provider, media storage and transactional email provider.
- Administrator accounts, role assignments and MFA recovery.
- Retention periods and approved privacy/terms copy.
- Domain, public business contact channels and final company copy.
- Styling implementation should remain consistent; the current code uses Tailwind's import for compatibility but the custom homepage styles are authored in `app/globals.css`. Confirm the long-term approach before expanding the design system.

Do not silently resolve these decisions. Record approved choices in `docs/decisions/` and update the relevant baseline documents in the same change.

## Database implementation status

- Payload collection/global configuration is in `payload.config.ts`; the database requirements catalogue is in `docs/database-requirements.md`.
- Generate the initial migration with `npm run migrate:create`, review it, commit it, and test it against an empty disposable PostgreSQL database before staging.
- Payload owns the physical schema. Do not add parallel handwritten tables for CMS-owned collections.
- The migration generator and build have not been executed in this environment. A committed lockfile, generated migration and passing CI results remain outstanding.
