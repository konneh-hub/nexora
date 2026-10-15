# Roles and Permissions

**Baseline:** Administrator, Content Editor, Enquiry Handler. No public registration.

## Permission matrix

| Capability | Administrator | Content Editor | Enquiry Handler |
|---|---:|---:|---:|
| View admin dashboard | Yes | Yes | Yes |
| Create/edit content drafts | Yes | Yes | No |
| Preview drafts | Yes | Yes | No |
| Submit content for review | Yes | Yes | No |
| Publish/unpublish/schedule content | Yes | No | No |
| Restore content versions | Yes | Own permitted content only if CMS supports safe restore; otherwise Administrator only | No |
| Manage product availability status | Yes | No | No |
| Set a product to Available | Yes | No | No |
| Manage media library | Yes | Yes, subject to upload rules | No |
| View enquiry inbox | Yes | No by default | Yes |
| Change enquiry status/assignee/internal notes | Yes | No | Yes |
| Export enquiry CSV | Yes | No | No |
| Invite/deactivate users and assign roles | Yes | No | No |
| Change security/site settings | Yes | No | No |
| View audit log | Yes | No | No |
| Edit/delete audit events | No normal UI access | No | No |

## Enforcement requirements

- Apply access rules on the server for CMS collection operations, route handlers, server actions and any API endpoints.
- Hiding a navigation item or button is not authorization.
- Denied operations return a safe 403/404 response and are covered by negative tests.
- No user may grant themselves a role, publish content without permission, export enquiries without permission, or access drafts by guessing IDs/slugs.
- Administrator accounts require MFA. No self-service registration.
- Invited accounts remain pending until the invitation is verified and the user completes required setup.
- Deactivation invalidates active sessions and prevents new sessions promptly.
- Keep a documented emergency recovery path that does not bypass audit logging.

## Approval/change control

The current policy is Editor submits for review and Administrator publishes. A different policy requires founder approval and updates to this document, `product.md`, `AGENTS.md`, the SRS and relevant tests in one reviewed change.
