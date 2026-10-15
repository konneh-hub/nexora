# Deployment Guide

**Status:** Provider-neutral until the hosting, CMS and database are approved.

## Environments
- Maintain separate development, staging and production environments.
- Use separate credentials and storage buckets. Never copy real enquiry records into lower environments.
- Store secrets only in the hosting secret manager or local untracked environment files.
- `.env.example` contains variable names and safe descriptions only.

## Pre-deployment gates
1. Review the PR against `AGENTS.md`, `product.md` and the SRS.
2. Install dependencies from the committed lockfile.
3. Run lint, typecheck, unit/integration tests, accessibility checks and production build.
4. Run dependency audit and resolve or document findings according to the project's risk process.
5. Verify denied-role tests, public unpublished-content checks, enquiry storage-before-notification and error handling.
6. Review migrations for reversibility and run them against staging with synthetic data.
7. Confirm backup and restore readiness before any schema-affecting production release.

## Release
1. Deploy the reviewed commit to staging.
2. Run smoke tests for public routes, forms, admin login/MFA, permissions and enquiry workflow.
3. Obtain approval for public content, privacy/terms, business claims and product status.
4. Deploy using the hosting provider's documented release process.
5. Verify HTTPS, domain, robots/sitemap, logs/monitoring, email delivery and cache revalidation.
6. Record release commit, migration version, verification results and rollback owner.

## Rollback
- Roll back application code to the last known-good release when possible.
- Database rollback must follow the migration's reviewed rollback plan; never improvise destructive production SQL.
- Preserve enquiries and audit records.
- After rollback, test public availability, login, permissions and enquiry submission.

## Unresolved setup
Domain, hosting provider, CMS, database provider, media storage, email provider, monitoring and backup destinations must be approved and recorded before launch. This guide is not evidence that production has been configured.
