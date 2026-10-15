# Nexora Technologies — Public Website

Nexora Technologies is a proposed Sierra Leone technology business. This repository is for its public marketing website, protected content-management system (CMS), administration dashboard and enquiry workflow. It is **not** the Nexora Business SaaS product.

**Baseline:** SRS v1.1, `product.md`, and `AGENTS.md`. Read the development rules before making changes.

## Current status

The public homepage and initial operating documentation are under review in a draft pull request. The production CMS has not yet been selected: Payload CMS is recommended, but the product baseline requires a proof of concept before final selection. Do not treat this repository as launch-ready.

## Requirements

- Node.js version supported by the pinned Next.js release.
- npm.
- Do not configure production services or add secrets until the relevant architecture and provider choices are approved.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run audit
npm run build
```

A dependency lockfile and automated tests still need to be established as part of the engineering foundation. Do not merge a release without repeatable dependency installation, automated tests, accessibility checks and a passing production build.

## Project documents

- `product.md` — product goals, scope, journeys, decisions and launch gate.
- `docs/acceptance-traceability.md` — initial SRS acceptance mapping, test evidence requirements and implementation status.
- `AGENTS.md` — mandatory engineering and safety rules.
- `Nexora_Technologies_Public_Website_SRS_v1_1.docx` — detailed requirements and acceptance criteria.
- `docs/architecture.md` — system boundaries and flows.
- `docs/content-model.md` — proposed CMS entities and invariants.
- `docs/roles-and-permissions.md` — role matrix and server-enforced access rules.
- `docs/admin-guide.md` — draft operating guide.
- `docs/privacy-and-retention.md` — data inventory and decisions requiring legal review.
- `docs/deployment.md`, `docs/backup-and-restore.md`, `docs/incident-response.md` — operational requirements.
- `docs/decisions/` — architecture decisions and approval status.

## Important launch restrictions

- No public admin registration or unauthenticated admin access.
- Only published CMS content may be public.
- Enquiries must be stored before notification is attempted.
- Administrator MFA, server-side authorization, audit logging and tested backups are launch requirements.
- Nexora Business remains Planned or Pilot until approved.
- Do not publish unconfirmed company details, contact channels, legal notices, pricing, testimonials or portfolio claims.
