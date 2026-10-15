# Payload database migrations

The schema is defined in `payload.config.ts`. Payload owns the physical PostgreSQL schema for its collections, globals, authentication, relationships and version tables; do not maintain a parallel hand-written set of tables.

## First database setup

1. Provision a new, empty PostgreSQL database for this environment.
2. Set `DATABASE_URL` and a cryptographically random `PAYLOAD_SECRET` in the environment. Never commit either value.
3. Install dependencies with the committed lockfile once it is available. This branch currently has no lockfile, so the dependency set is not yet reproducible with `npm ci`.
4. Generate the initial migration from the exact checked-in Payload config:
   `npm run migrate:create`
5. Review the generated SQL/TypeScript migration in this directory. Confirm tables, foreign keys, unique constraints, indexes, version tables and auth tables. Commit the generated migration.
6. Apply it to the empty development database:
   `npm run migrate`
7. Generate Payload types:
   `npm run generate:types`
8. Create the first Administrator using the one-time bootstrap command in the admin guide. Do not enable public registration.
9. Verify the schema with the database acceptance checklist before using staging or production.

## Change workflow

For every schema change, update the collection/global config, generate a migration, review it, test upgrade and recovery against a disposable PostgreSQL database, and commit the migration with the code. Do not rely on development schema push as the production migration process.

## Important current status

This file is a migration procedure, not evidence that a migration has already been generated or applied. The current environment has no repository shell/network access to install dependencies or run Payload's migration generator. Do not claim the database is production-ready until the initial generated migration is committed and the CI database tests pass.
