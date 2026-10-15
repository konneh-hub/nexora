# Database Requirements and Field Catalogue

**Status:** Requirements baseline only. This is not an executable or production migration. The final physical schema must be generated from the CMS proof of concept and approved CMS decision in ADR 0001.

**Sources of truth:** SRS v1.1, `AGENTS.md`, `product.md`, `docs/content-model.md`, `docs/roles-and-permissions.md`, and `docs/privacy-and-retention.md`.

## Design rules

- Use managed PostgreSQL for persistent application data once the CMS/database path is approved.
- Use UUID identifiers where supported; timestamps are UTC; persist timestamps as timezone-aware values.
- Use foreign keys for relationships, uniqueness constraints for slugs and identity fields, and indexes for route lookups, status filters, dates, and assignments.
- Do not store passwords, MFA secrets in application-owned tables, payment details, identity documents, real enquiries in seed data, or secrets in audit metadata. Prefer the chosen CMS's vetted auth/session/MFA implementation.
- CMS-managed users, sessions, roles, version tables and upload metadata should be provided by the selected CMS wherever possible. Do not duplicate CMS system tables with a second custom auth implementation.
- Enforce permissions and publication rules in server-side CMS access controls/hooks and API handlers, not only in the admin UI.
- All public reads must filter to Published and pass publication/permission gates. Draft, In review, Archived, scheduled-but-not-yet-published, trashed and permission-unconfirmed content is private.
- Use migrations that are reviewable and reversible. Do not connect this specification to a production database or run production migrations without approval.
- Final retention durations remain configurable and unapproved pending local legal advice; the proposed 12–24 month enquiry and 12 month audit periods are not legal commitments.

## Entities and required fields

Field types below are logical requirements, not a commitment to a specific ORM's physical representation. CMS-managed fields may use equivalent native fields.

### 1. Pages

| Field | Required | Rules / purpose |
|---|---|---|
| id | Yes | Stable primary identifier |
| title | Yes | Bounded plain text |
| slug | Yes | URL-safe, unique, indexed |
| summary | No | Bounded plain text |
| sections | Yes | Typed allow-listed section blocks; no arbitrary executable HTML or scripts |
| seoTitle | Before publish | Bounded title |
| seoDescription | Before publish | Bounded description |
| canonicalUrl | No | Valid URL; validated if supplied |
| socialImageId | No | Relationship to media |
| noIndex | Yes | Defaults to true for preview/private states; public value is explicit |
| status | Yes | Draft, In review, Published, Archived |
| authorId / lastEditorId | If supported | CMS user relationships |
| publishedAt | Conditional | Set only on publication |
| scheduledPublishAt | No | UTC schedule |
| scheduledUnpublishAt | No | UTC schedule |
| createdAt / updatedAt | Yes | UTC timestamps |
| deletedAt | If supported | Trash/recovery rather than immediate destructive deletion |

Constraints: unique slug; publication validation requires required content and SEO metadata; published slug changes create a redirect record.

### 2. Services

Required fields: `id`, `title`, `slug`, `summary`, `intendedCustomers`, `outcomes`, `scope`, `limitations`, `enquiryCallToAction`, `sortOrder`, `status`, `createdAt`, `updatedAt`.

Optional/conditional fields: `seoTitle`, `seoDescription`, `canonicalUrl`, `socialImageId`, `publishedAt`, `scheduledPublishAt`, `scheduledUnpublishAt`, `authorId`, `lastEditorId`, `deletedAt`.

Rules: unique slug; filter by status for public queries; pricing/response-time claims require separately approved settings and must not be invented.

### 3. Products

Required fields: `id`, `title`, `slug`, `summary`, `intendedUsers`, `plannedFeatures`, `availabilityStatus`, `status`, `createdAt`, `updatedAt`.

Optional/conditional fields: SEO fields, `socialImageId`, publication/scheduling timestamps, author/editor IDs, `deletedAt`.

Rules: `availabilityStatus` is exactly Planned, Pilot or Available. Only an Administrator may change it to Available. No purchase/sign-up CTA unless status is Available. Nexora Business remains Planned or Pilot until explicit approval.

### 4. FAQs

Required fields: `id`, `question`, `answer`, `sortOrder`, `status`, `createdAt`, `updatedAt`.

Optional fields: `category`, author/editor IDs, publication/scheduling timestamps, `deletedAt`.

Rules: answer content must be sanitised/allow-listed; public list returns only Published records and uses deterministic ordering.

### 5. Portfolio entries (conditional feature)

Required fields: `id`, `title`, `slug`, `summary`, `permissionConfirmed`, `permissionApproverId`, `permissionApprovedAt`, `status`, `createdAt`, `updatedAt`.

Optional fields: `clientDisplayName`, `logoMediaId`, `mediaIds`, `outcomes`, `permissionEvidenceReference`, `permissionExpiryOrReviewAt`, SEO fields, publication timestamps, author/editor IDs, `deletedAt`.

Rules: no fake records. Publication is blocked unless permission is confirmed and approver/date evidence is present. Expired or withdrawn permission must remove the record from public output.

### 6. Testimonials and client/partner logos (conditional feature)

Required fields: `id`, `kind`, `permissionConfirmed`, `permissionApproverId`, `permissionApprovedAt`, `permissionEvidenceReference`, `status`, `createdAt`, `updatedAt`.

Conditional fields: testimonial quote/attribution or logo/media relationship, `permissionExpiryOrReviewAt`, author/editor IDs and publication timestamps.

Rules: never seed fabricated testimonials, client names, logos or partnerships. A record cannot be published without recorded permission and approver/date/evidence.

### 7. Media assets

Required fields: `id`, `storageKey`, `originalFilename` (display/metadata only; never use as a storage path), `mimeType`, `byteSize`, `visibility`, `createdAt`, `updatedAt`.

Conditional/optional fields: `altText`, `decorative`, `caption`, `credit`, `licence`, `width`, `height`, `checksum`, `uploadedById`, `usageNotes`, `deletedAt`.

Rules: validate file content rather than trusting extension; enforce approved size/type limits; randomise storage keys; strip EXIF location metadata; private files remain private. Informative images require meaningful alt text before publication; decorative images must be explicitly marked. Do not delete media referenced by published content without a safe replacement/removal workflow.

### 8. Global site settings

A single versioned global (or equivalent CMS singleton) must support:
- `businessName` and approved `tagline`;
- confirmed public email, phone, WhatsApp, address and address-visibility flag;
- social links, each with validated URL and enabled/confirmed state;
- navigation items and footer links (validated internal route or safe external URL);
- optional approved response-time statement;
- approved banner content and enable/disable state;
- default SEO title, description and social image;
- privacy-conscious analytics enabled flag, default off until approved;
- `updatedById`, `updatedAt`.

Rules: administrator-only editing; changes are audited. Unconfirmed contact fields are absent/disabled, never filled with guesses. Brand tokens are code-defined and cannot be edited here. Do not permit arbitrary scripts, unsafe URLs or HTML injection.

### 9. Redirects

Required fields: `id`, `fromPath`, `toPath`, `httpStatus`, `createdAt`, `createdById`.

Rules: unique `fromPath`; permit only approved redirect status (301 for published slug changes); validate local destination or safe allow-listed external destination; prevent loops and chains where practical; never redirect to admin, preview or API routes as public content.

### 10. Enquiries

Required fields:
- `id` (unguessable public-facing identifiers; never disclose stored IDs to anonymous clients);
- `type` (Project, Contact, ProductInterest);
- `sourceForm`;
- `name`;
- `email` and/or `phone` (at least one required);
- `organisation` (optional);
- `serviceInterest` (optional for contact/product forms where not relevant);
- `budgetRange` (optional);
- `preferredContactMethod`;
- `message` or product-interest `useCase` as appropriate;
- `status` (New, In progress, Responded, Closed, Spam);
- `createdAt`, `updatedAt`;
- `retentionReviewAt`;
- notification state (see next entity).

Consent fields: store marketing consent separately from enquiry submission, including `marketingConsent` (boolean, default false), `marketingConsentAt` (nullable), `consentNoticeVersion` (nullable/versioned reference). Do not treat submitting an enquiry as marketing consent.

Operational fields: `assigneeId` (nullable CMS user relationship), `internalNotes` or a separate notes/history collection, `sourcePath`, `idempotencyKeyHash` or equivalent deduplication key (never raw secrets), and `spamDisposition` where needed.

Rules: visitor-submitted fields are immutable after creation. Enquiry handlers may only update status, assignee and internal notes; Administrators may export or perform approved deletion/anonymisation. Public POST rejects unknown fields and returns no stored records, internal fields or other record IDs. Store before notification. Do not store IP addresses or fingerprints indefinitely; if needed for rate limiting, use short-lived/minimised data with an approved retention policy.

### 11. Enquiry internal notes / status history

Required fields: `id`, `enquiryId`, `actorId`, `eventType`, `createdAt`.

Optional fields: `noteText` (bounded; internal only), `previousStatus`, `newStatus`, `previousAssigneeId`, `newAssigneeId`.

Rules: never expose notes or history to the public endpoint. Apply role checks on every read/write. Do not store unnecessary personal data in notes. Prefer append-only history for status/assignment changes.

### 12. Notification delivery attempts

Required fields: `id`, `enquiryId`, `channel`, `status` (Pending, Sent, Failed, RetryScheduled or equivalent), `attemptCount`, `createdAt`, `updatedAt`.

Optional fields: `providerMessageId`, `lastAttemptAt`, `nextAttemptAt`, `failureCode` (sanitised, non-secret), `sentAt`.

Rules: persist enquiry first; delivery failures must not roll back or delete it. Do not store full enquiry messages or unnecessary personal data in provider logs. Retry operations must be idempotent and visible to authorised handlers.

### 13. Users, roles, invitations and authentication

Use the chosen CMS's built-in users, roles/access control, sessions and MFA where feasible; do not create a parallel password/session system.

Application-level fields/relationships required in addition to native CMS fields:
- user display name and work email (unique, normalised);
- role mapping to Administrator, Content Editor or Enquiry Handler;
- active/deactivated state and `deactivatedAt`;
- `lastSignInAt` if the CMS exposes it safely;
- invitation records: `id`, `email`, `role`, `invitedById`, `tokenHash`, `expiresAt`, `acceptedAt`, `revokedAt`, `createdAt`;
- any setup/recovery state required by the selected CMS, using its native secure implementation.

Rules: no public registration; invitation tokens are single-use, expiring and stored hashed; never store raw invitation/recovery tokens; enforce server-side role permissions; Administrators require MFA; deactivate/revoke sessions promptly; prevent self-escalation and prevent removing/demoting/deactivating the last active Administrator. Document emergency recovery. Do not seed production accounts.

### 14. Audit events

Required fields: `id`, `occurredAt`, `actorId` (nullable for system/anonymous security events), `action`, `targetType`, `targetId` (nullable), `outcome`, `requestCorrelationId` (if available).

Optional metadata must be allow-listed and minimal; it may include changed field names or reason codes, not field values by default.

Rules: append-only; no normal edit/delete UI; protect access to Administrators. Never record passwords, tokens, MFA secrets, full enquiry messages, raw request bodies, or unnecessary personal data. Log publishing/unpublishing, role/invitation changes, exports, security events, settings changes, deletion/anonymisation and restore actions.

### 15. CMS version history and scheduled publishing

Use the selected CMS's versioning/history feature for each editable content entity. The logical version record must preserve:
- entity/record ID and collection type;
- version number or stable version ID;
- snapshot of allowed content fields;
- author/editor ID and timestamp;
- lifecycle state at that version;
- restore attribution and timestamp where supported.

Rules: history must support compare/restore. Restoring as Editor creates a Draft; only Administrator can publish. Scheduled publish/unpublish must use UTC and enforce permission/required-field checks at execution time, not just when scheduling.

## Relationships and indexes

At minimum, implement equivalent indexes/constraints for:
- unique `slug` within each route collection;
- `status + publishedAt` on public content collections;
- `scheduledPublishAt` and `scheduledUnpublishAt` for due jobs;
- redirect `fromPath` unique;
- enquiry `createdAt`, `status + createdAt`, `assigneeId + status`, and `retentionReviewAt`;
- notification `status + nextAttemptAt`;
- invitation `email + expiresAt` and unique token hash;
- audit `occurredAt`, `actorId + occurredAt`, and `targetType + targetId`;
- media relationships used to prevent deletion of referenced assets.

Use foreign keys or the CMS's equivalent relationship constraints for users, media, enquiries, versions and redirects. Do not add indexes on sensitive free-text messages without a documented need.

## Acceptance tests required before calling the database implemented

1. Clean database migration succeeds from an empty PostgreSQL database.
2. Upgrade migration succeeds on synthetic staging data; rollback/recovery procedure is documented and tested.
3. Required fields, enums, unique slugs, relationships and constraints reject invalid records.
4. Public data access returns Published records only; Draft, In review, Archived, scheduled future and permission-unconfirmed content are excluded.
5. An unpublished or unknown slug returns 404; published slug changes create a safe redirect.
6. Product availability cannot be changed to Available by Editor or Enquiry Handler.
7. Enquiry requires name and at least one contact channel; unknown input fields are rejected; marketing consent remains separate.
8. Visitor-submitted enquiry fields cannot be edited by handlers; handlers can update only status, assignee and internal notes.
9. Enquiry persists when notification delivery fails; failed delivery remains visible and retryable.
10. Only Administrators can export enquiries, edit global settings, manage users/roles, publish content or view audit events.
11. Audit records cannot be updated/deleted through normal application operations and contain no prohibited secrets or full messages.
12. Retention review, anonymisation/deletion, backup, restore and export preserve referential integrity and required audit evidence.
13. Development seeds contain only clearly synthetic records and no invented public testimonials, clients, contact details or product availability claims.
14. All tests run in CI alongside lint, typecheck, dependency audit and production build.

## Implementation gate

The repository has not yet selected a production CMS. The physical schema, CMS-generated migrations, database adapter and lockfile must not be committed as production implementation until the CMS proof of concept and dependency compatibility have been reviewed and the founder approves the selected path. This requirement catalogue is the complete implementation checklist for that step.
