# Privacy and Retention

**Status:** Operational draft. Not legal advice. Obtain qualified local legal advice and founder approval before publishing a privacy notice or setting final retention periods.

## Data inventory

| Data | Purpose | Access | Proposed retention |
|---|---|---|---|
| Enquiry name, contact channel, organisation, service interest, optional budget and message | Respond to the visitor's request | Administrator and Enquiry Handler | Proposed 12–24 months, pending approval |
| Internal enquiry notes and status history | Coordinate follow-up | Administrator and Enquiry Handler | Review with the enquiry record |
| Admin account identifiers and security events | Access control and incident investigation | Administrator; minimal data in audit events | Audit log proposed 12 months, pending approval |
| Necessary session/security data | Authenticate and protect admin sessions | System; limited admin diagnostics | Defined by implementation and security review |
| Optional analytics | Understand aggregate site usage | Only after privacy review | Disabled until approved |

Collect only fields needed for the stated purpose. Do not add sensitive-data fields without an approved requirement and privacy review.

## Handling rules

- Show a concise privacy notice next to each public form, linking to the full approved notice.
- Do not submit visitor data to analytics or advertising systems.
- Store enquiries before sending notifications. Email notification should contain only the minimum details needed and preferably link handlers to the protected inbox.
- Do not use real enquiries in development, staging, automated tests, or screenshots.
- Restrict CSV export to Administrators; protect exported files and remove them when no longer required.
- Provide a documented process to locate a record, assess a correction/deletion/anonymisation request, verify the requester appropriately, and record the action without retaining unnecessary copies.
- Review records at their retention date and delete or anonymise according to the approved policy and applicable legal obligations.
- Do not promise a legal response deadline until qualified advice confirms it.

## Launch blockers

1. Confirm legal entity details and contact responsible for privacy matters.
2. Obtain local advice on applicable Sierra Leone privacy, consumer and electronic communications requirements.
3. Approve the public privacy notice and terms.
4. Approve enquiry and audit-log retention periods.
5. Confirm email provider, data location, backups and deletion behaviour.
6. Test export restriction, request handling, retention review and audit trail.
