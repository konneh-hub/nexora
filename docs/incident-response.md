# Incident Response

**Status:** Initial runbook; add provider-specific contact and escalation details after deployment is selected.

## Triggers
- Suspected admin account compromise or unexpected MFA reset.
- Enquiry or draft data exposed to an unauthorised person.
- Unexpected public content, product-status change or unauthorised publication.
- Repeated failed logins, unusual privilege changes or suspicious export.
- Database, media, email or backup outage; unexplained notification failures.
- Secrets committed to Git or disclosed in logs.

## First response
1. Record the time, observed symptoms, affected systems and the person responding.
2. Contain the incident: deactivate affected accounts, revoke sessions/credentials or restrict access as appropriate. Do not destroy evidence.
3. Preserve relevant audit/security logs while minimising further exposure of personal data.
4. Notify the founder/incident owner through the agreed private channel.
5. Assess affected data, scope, duration and ongoing risk. Do not speculate publicly.
6. Restore service from a known-good release or tested backup when appropriate.
7. Verify permissions, public content, forms, notification delivery and monitoring before declaring recovery.
8. Document root cause, impact, actions, evidence references and follow-up owners.

## Privacy and external communications
- Do not send incident details or personal data to an unapproved channel.
- Obtain qualified local advice on notification duties and timelines before making legal determinations.
- Public statements must be approved by the founder and must be accurate.
- Do not delete or alter audit evidence to make an incident appear smaller.

## After action
- Rotate exposed credentials and remove leaked secrets from active use; repository history cleanup requires a reviewed plan.
- Add tests and controls to prevent recurrence.
- Update this runbook with provider-specific contacts, responsibilities and recovery procedures.
