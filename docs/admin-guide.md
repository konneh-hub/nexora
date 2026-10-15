# Administrator and Editor Guide

**Status:** Initial operating guide. Update screenshots and exact controls after the CMS is selected and tested.

## Access
- There is no public registration.
- Administrators invite users and assign the least-privileged role needed.
- Administrators must configure MFA and keep recovery material secure.
- Never share accounts, passwords, MFA codes or invitation links.
- If an account is suspected compromised, deactivate it and follow `docs/incident-response.md`.

## Editorial workflow
1. Open the protected CMS using the deployment's approved admin URL.
2. Create or edit a draft.
3. Check spelling, links, mobile presentation, image rights and alt text.
4. Preview using the real public template.
5. Submit the draft for review.
6. An Administrator verifies claims and permissions, then publishes.
7. Confirm the public page reflects the change within 60 seconds.
8. If a publication is incorrect, unpublish or restore the last known-good version and verify the public result.

Only published records should be visible publicly. Do not paste private enquiry details into public content or upload files containing secrets.

## Enquiry handling
1. Open the enquiry inbox and review new items.
2. Use only the contact details supplied for the purpose of responding to that enquiry.
3. Update status and assignee; keep notes factual and professional.
4. Never put passwords, payment details, sensitive personal details or unnecessary information in internal notes.
5. If email notification fails, the stored enquiry remains the source of truth. Follow the visible failure flag and retry/escalate using the configured procedure.
6. CSV export is Administrator-only. Store exports securely and remove them when no longer required.

## Product status and claims
- Nexora Business remains Planned or Pilot until explicitly approved.
- Only an Administrator may set it to Available.
- Publish client names, logos, testimonials and portfolio entries only when permission is recorded.
- Do not invent prices, response-time promises, credentials, offices or contact details.

## Routine checks
- Review failed enquiry notifications and new enquiries each working day.
- Review drafts awaiting approval and recent admin activity.
- Verify backups and complete restore tests according to `docs/backup-and-restore.md`.
- Keep dependencies and hosting updated; follow the documented deployment process.
- The final guide must be validated by a non-technical editor as part of acceptance test AC-024.
