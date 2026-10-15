# SRS Acceptance Traceability Matrix

**Baseline:** Nexora Technologies Public Website SRS v1.1 (13 October 2026), AGENTS.md, and product.md
**Branch:** feat/nexora-public-foundation
**Status:** Initial traceability baseline; no requirement is considered passed until an automated or documented manual test provides evidence.

## Status meanings
- **Not implemented** — no verified implementation exists.
- **Partial** — some foundation exists, but the end-to-end acceptance condition is not met.
- **Blocked** — implementation depends on an unresolved decision or provider.
- **Not verified** — code may exist, but no repeatable test evidence has been recorded.
- **Pass** — implementation and the stated acceptance test have evidence in CI or a recorded manual run.

## Acceptance criteria

| ID | Acceptance area | Required evidence / test | Current status |
|---|---|---|---|
| AC-001 | Public navigation and internal links | Crawl every public route; verify all internal links resolve and admin/preview/API routes are not linked publicly | Partial — homepage foundation only; routes and link test missing |
| AC-002 | Responsive layout | E2E viewport checks at phone, tablet and desktop widths; keyboard and touch navigation checks | Not verified |
| AC-003 | Accessible enquiry forms | Automated accessibility scan plus keyboard test; labels, error associations, error summary focus and non-colour-only errors | Not implemented |
| AC-004 | Content and claims are truthful | Content validation test rejects unapproved claims, prices, contact channels and permission-gated assets | Partial — Payload schema hooks enforce SEO/permission/media gates; full public content integration remains |
| AC-005 | Safe error handling | Integration tests assert generic errors with no stack, SQL, file paths, versions or secrets | Not implemented |
| AC-006 | Public content approval | Tests prove drafts, review items, archived items and permission-unconfirmed claims never render publicly | Partial — Payload access rules configured; public route adapter and tests remain |
| AC-007–AC-008 | Public route/content behaviour | Route tests cover required pages, CMS-backed rendering, unpublished/missing slug 404s and product availability CTA rules | Partial — homepage only; remaining routes and CMS adapter missing |
| AC-009–AC-011 | Enquiry form validation and persistence | Valid/invalid payload tests; success only after persistence; failed submission preserves form input | Not implemented |
| AC-012 | Admin/editor operating workflow | Follow the admin guide using a non-technical test user; verify draft, review and publish permissions | Partial — Payload admin/auth collections configured; full workflow and MFA verification remain |
| AC-013–AC-015 | Enquiry privacy and spam controls | Tests for rate limits, honeypot, unknown-field rejection, consent separation, duplicate protection and minimal responses | Not implemented |
| AC-016–AC-018 | CMS content lifecycle | Integration tests for draft, review, publish, unpublish, version restore, scheduling and slug redirects | Partial — Payload versions, lifecycle fields and redirects configured; scheduling/restore integration and tests remain |
| AC-019–AC-021 | Authentication, roles and security | Unauthenticated/forbidden direct API tests; mandatory Administrator MFA; invitation-only users; lockout/session invalidation | Not implemented |
| AC-022 | Backup, restore and portability | Recorded restore exercise plus content/media export and integrity checks | Not implemented |
| AC-023 | Launch and operational readiness | Deployment, HTTPS, monitoring, secrets, privacy review and recovery checks documented and verified | Not implemented |
| AC-024 | Editor independence | Usability test: trained editor completes routine content and FAQ updates, image replacement, preview and review without developer assistance | Not verified — Payload admin route/config exists; usability test not run |

> The SRS is the authority for the exact wording and grouping of acceptance criteria. The grouped rows above are a tracking index, not a replacement for the source SRS. Split any grouped row into individual source criteria when test cases are authored.

## Requirement-to-test coverage

| Requirement group | Implementation area | Minimum automated coverage |
|---|---|---|
| FR-001–FR-004 | Shared header, mobile navigation, footer, interaction states | Component/E2E keyboard, touch and responsive tests |
| FR-005–FR-008, FR-016, FR-022, FR-026–FR-039 | Public pages, content workflow, SEO, product status, permissions | CMS access tests, route tests, metadata/sitemap tests, redirect tests |
| FR-009–FR-017 | Enquiry forms, consent and spam controls | Schema unit tests, API integration tests, rate-limit and idempotency tests |
| FR-021, FR-040–FR-053 | Admin dashboard, invitation/authentication, roles, MFA, audit log | Unauthenticated/role-matrix tests, MFA and session tests, audit immutability tests |
| FR-054–FR-055 | Enquiry immutability and notification delivery | Field-level authorization tests; store-first/email-failure integration test |
| NFR-001–NFR-013 | Performance, security, accessibility, privacy, resilience and maintainability | CI checks plus documented manual/security/performance tests |

## Database implementation status

- `payload.config.ts` now defines the Payload/PostgreSQL schema baseline and server-side collection access rules. `docs/database-requirements.md` remains the complete field/constraint acceptance catalogue.
- Payload CMS 3.90.2 and its PostgreSQL adapter are approved by explicit founder instruction. Node.js 24.15.0+ and TypeScript 6.0.3+ are pinned as compatibility requirements.
- The initial migration and npm lockfile must be generated, reviewed and committed; a disposable PostgreSQL CI workflow is being used to generate/apply the initial migration and exercise the schema test.
- Do not mark the database fully implemented until the migration artifact is committed and CI lint/typecheck/audit/build plus PostgreSQL migration tests pass.

## Dependency and CMS gates
1. Payload 3.90.2 is selected; keep all `@payloadcms/*` packages on the same exact version.
2. Do not resolve dependency conflicts by silently upgrading framework packages. Record compatibility and lock the resulting dependency tree.
3. Commit a reproducible npm lockfile; CI must use npm ci, not npm install.
4. Required quality gates before merge: lint, typecheck, unit/integration tests, E2E tests, accessibility tests, dependency audit and production build.
5. A test result is Pass only when the workflow run is available and green. Missing or unrun checks remain Not verified.

## Evidence log

| Date | Evidence | Result |
|---|---|---|
| 2026-10-15 | Existing draft PR #1 and current repository files inspected through GitHub | Homepage and documentation foundation exists; complete acceptance traceability, lockfile, CMS, enquiry workflow, tests and verification remain outstanding |
