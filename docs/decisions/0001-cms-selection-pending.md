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

## Consequences
No production CMS dependencies, schema or irreversible platform choice should be introduced until the proof of concept is evaluated and the founder approves the result. Once approved, update this ADR, `AGENTS.md`, `product.md`, the SRS decision record and architecture documentation in the same reviewed change.
