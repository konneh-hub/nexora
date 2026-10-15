# ADR 0001: CMS Selection Requires a Proof of Concept

- **Status:** Proposed; no final selection
- **Date:** 2026-10-15
- **Decision owner:** Founder

## Context
The product baseline recommends Payload CMS but explicitly leaves final selection open until a proof of concept. The application needs structured content, draft/preview/publish workflows, version history, scheduled publishing, role-based access, MFA, enquiry management and append-only audit logging. It also needs affordable operations for a solo founder.

## Options to evaluate
- Payload CMS with PostgreSQL.
- Strapi with PostgreSQL.
- Directus with PostgreSQL.
- Any other option only if it materially meets requirements and is justified.

## Proof-of-concept acceptance checklist
- [ ] Compatible with the repository's Next.js/React versions and deployment model.
- [ ] Supported managed PostgreSQL adapter and a documented migration/backup path.
- [ ] Administrator, Editor and Enquiry Handler permissions enforced on the server.
- [ ] Administrator MFA, brute-force protection, session invalidation and account recovery verified.
- [ ] Draft, preview, review, publish, unpublish, versions, restore and scheduled publishing demonstrated.
- [ ] Only published content can be fetched through public routes.
- [ ] Published slug changes can create safe redirects.
- [ ] Media upload constraints, alt text, access control and S3-compatible storage verified.
- [ ] Enquiry records and notification delivery state can be stored safely.
- [ ] Append-only audit trail can capture relevant events without logging sensitive data.
- [ ] Content and media export is practical; backups and restore can be tested.
- [ ] Total recurring cost, maintenance effort, accessibility and security advisories reviewed.

## Preliminary compatibility review (2026-10-15)

This is a documentation-level review, not a completed runnable proof of concept.

- The repository pins Next.js `16.4.0`, React/React DOM `19.3.0`, TypeScript `^5`, and CI Node.js `22`.
- Payload's current installation documentation lists Node.js `24.15.0+`, Next.js `16.4.0+`, and TypeScript `6.0.3+`. Its PostgreSQL adapter is officially supported and uses Drizzle. The documented Node and TypeScript requirements do not match the current CI toolchain, so adding Payload now would require a separately reviewed toolchain/dependency change and reproducible compatibility tests. Sources: [Payload installation requirements](https://payloadcms.com/docs/getting-started/installation), [Payload PostgreSQL adapter](https://payloadcms.com/docs/database/postgres).
- Strapi and Directus remain candidates for a comparative proof of concept, but they run as separate CMS services rather than being embedded into this Next.js application. Their hosting, recurring cost, auth/MFA behaviour, editorial workflow and integration cost must be assessed against the solo-founder maintenance constraint.
- No CMS package has been installed, no database adapter selected, and no production migration generated.
- The complete logical field/constraint catalogue is tracked in [Database Requirements and Field Catalogue](../database-requirements.md). It deliberately does not pretend to be an executable schema.

### Required next proof-of-concept work

1. Run a disposable, isolated proof of concept for the leading candidate(s); record exact package versions and peer requirements, including Node.js, Next.js, React and TypeScript.
2. Demonstrate PostgreSQL migration generation and clean-database setup; inspect generated tables and indexes.
3. Demonstrate Administrator/Content Editor/Enquiry Handler access, mandatory Administrator MFA, invitations, publishing/versioning/scheduling, published-only public queries, enquiry persistence and append-only audit.
4. Estimate recurring hosting/database/storage/email cost and the maintenance burden for one operator.
5. Record test evidence, remaining gaps and a recommended choice. Do not change the framework/toolchain or select the production CMS without founder approval.

## Consequences

No production CMS dependencies, schema or irreversible platform choice should be introduced until the proof of concept is evaluated and the founder approves the result. Once approved, update this ADR, `AGENTS.md`, `product.md`, the SRS decision record and architecture documentation in the same reviewed change.
