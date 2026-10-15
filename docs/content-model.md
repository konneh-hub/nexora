# CMS Content Model

**Status:** Logical model for the CMS proof of concept. Exact field types and access syntax depend on the CMS selected.

## Common fields

Every editable record should have a stable ID, created/updated timestamps, author/editor attribution where supported, and a lifecycle status. Supported content lifecycle states are `Draft`, `In review`, `Published`, and `Archived`. Only `Published` content may be returned to public requests.

## Collections

### Pages
- `title` (required, bounded text)
- `slug` (required, unique, URL-safe)
- `summary` (bounded text)
- `sections` (typed, allow-listed section blocks; no arbitrary layout or executable code)
- `seoTitle`, `seoDescription`, `socialImage`
- `status`, `publishedAt`, `scheduledPublishAt`, `scheduledUnpublishAt`
- version history and preview metadata, provided by the chosen CMS

### Services
- `title`, `slug`, `summary`
- `intendedCustomers`, `outcomes`, `scope`, `limitations`
- `enquiryCallToAction`, SEO fields and lifecycle fields
- Approved service copy only; pricing requires explicit approval.

### Products
- `title`, `slug`, `summary`, `intendedUsers`, `plannedFeatures`
- `availabilityStatus`: `Planned`, `Pilot`, or `Available`
- SEO fields and lifecycle fields
- Only an Administrator may set `Available`. No purchase action unless status is `Available`.

### FAQs
- `question`, `answer`, `category`, `sortOrder`, lifecycle fields
- Rich text, if supported, must be sanitised and rendered through an audited allow-list.

### Portfolio and testimonials
- Include only genuine work with recorded permission to publish.
- Store permission evidence/reference, permitted name/logo/assets, attribution, expiry/review date and lifecycle status.
- Default to unpublished. Do not seed fake public testimonials, client names or portfolio items.

### Media
- `file`, `altText`, `caption`, `credit`, `licence`, `visibility`, dimensions and upload metadata.
- Require meaningful alt text for informative images; decorative images use empty alt text at render time.
- Enforce file type and size limits and safe upload handling.

### Site settings
- Editable navigation labels/targets, footer links, approved contact channels, social links and default SEO metadata.
- Never allow arbitrary script injection or editing of brand tokens.
- Do not expose unconfirmed contact information publicly.

### Enquiries
- `type`: `Project`, `Contact`, or `ProductInterest`
- `name`, `email` and/or `phone`, optional `organisation`, `serviceInterest`, `budgetRange`, `message`
- `status`: `New`, `In progress`, `Responded`, `Closed`, `Spam`
- `assigneeId`, internal notes, source form, created/updated timestamps, retention review date
- Notification delivery status and last attempt timestamp
- Submitted visitor fields are read-only to handlers. Do not store data not required for follow-up.

### Audit events
- Timestamp, actor ID, action, target type/ID, outcome and minimal metadata
- Append-only; no edit/delete UI for normal users
- Never record passwords, session tokens, MFA secrets, full enquiry messages or unnecessary personal data.

## Invariants

1. Only published content is public.
2. Every slug is unique within its route collection.
3. Slug changes create a redirect from the prior published path.
4. Editors can create and edit drafts and submit for review; only Administrators publish, unless the founder formally changes the policy.
5. Only Administrators can export enquiry CSVs or change a product to Available.
6. Enquiry storage must succeed before success is shown; email failure cannot erase the enquiry.
7. Version history, restore and scheduled publishing must be verified in the CMS proof of concept before selection.
