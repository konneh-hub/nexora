# Backup and Restore

**Status:** Requirements only; no provider or schedule is approved yet.

## What must be protected
- Managed PostgreSQL data, including CMS content, user/account state, enquiries, notification state and audit log.
- Media assets and any private files.
- Required deployment configuration and migration history, excluding secret values from exported documentation.

## Required controls
- Select and document database and media backup mechanisms, frequency, retention, encryption and access controls.
- Store backups separately from the primary service and restrict restore privileges.
- Do not place backup archives in the public web root or commit them to Git.
- Document the maximum acceptable data loss (RPO) and recovery time (RTO) with the founder before launch.
- Include retention and deletion obligations in the backup policy; explain when deleted personal data expires from backups.
- Monitor backup failures and document escalation ownership.

## Restore test
1. Select a recent backup and verify its integrity.
2. Restore to an isolated non-production environment.
3. Apply documented recovery steps and required migrations.
4. Verify content, users, enquiries, audit events and media references.
5. Run public-route, login, role-denial and enquiry smoke tests with synthetic or approved sanitised data.
6. Record date, backup age, duration, result, issues and remediation.
7. Destroy temporary restore data securely after the test.

A backup is not considered proven until a restore test passes. Complete and document a successful restore test before launch and repeat it periodically. Actual schedule and retention remain decisions to approve.
