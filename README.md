# App boiler plate

- By: Martin Anselmo
- Technologies
  - `Next.js`
  - `Prisma`, `postgres` & `tRPC`
  - `Clerk` for authentication
  - Easy deployment in `vercel`
  - `uploadThing`
  - `eslint` + `prettier`

## Quick start

### DEV Requirements

- `Docker` and `docker-compose` for the DB (or any url based psql database)
- `npm` or `pnpm`
- Environment variables
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` Obtained from Clerk
  - `CLERK_SECRET_KEY` Obtained from Clerk
  - `DATABASE_URL` Obtainable from docker-compose or any psql url (important: Must be pooled connection `6543` port in supabase)
    - To skip DB checks and be able to completely wipe out DB: `5432`
  - `UPLOADTHING_SECRET` Obtained from uploadThing panel
  - `UPLOADTHING_APP_ID` Obtained from uploadThing panel
- Scripts
  - `npm install` install js dependencies
  - `npm run start-db` starts the local db
  - `npm run db-create-migration` Based on the changes of prisma.schema, it receives a name and creates a migration for the local db, doesn't run it
  - `npm run  db-run-pending-migrations` runs the initial migrations of the db (adds Test model)
  - `npm run db-generate-client` Loads the prisma model into the prisma object (so TS nows what is inside the db)
  - `npm run dev` Starts dev server

### DB Guide

- `npm run db-create-migration`: Will ask for a migration name and create it, doesn't run it
- `db-migrate`: Runs all pending migrations

Prod
- Automatically each build should run all pending migrations in the db

## Vercel deployment
- Obtain env variables
  - Make sure the db is empty, otherwise you will need to reset it from the command line locally. 
    - Note: Only do this once and then delete the env variables that can access and delete prod DB.
    - Danger: DB port for this is 5432 in supabase, normal DB port is 6543
    - set the env variable to the correct db, https://www.prisma.io/docs/orm/prisma-migrate/workflows/prototyping-your-schema#choosing-db-push-or-prisma-migrate
- Import git repository in vercel
  - Leave the defaults for build commands. Each time a build is created in vercel, it should check for migrations and apply them if needed
  - Copy paste the .env stuff
- Issues I had when setting a new project
  - DB is not connecting: Create a new instance of supabase/whatever db you are using
  - Prisma invalid ... -> `npx run migrate reset && npm run db-generate-client` (resets the whole DB) 
  - Prepared statement s0 already exists: add `"?pgbouncer=true&connection_limit=1"` to `DATABASE_URL` (in theory is no longer needed since pgbouncer is deprecated but didn't work without it)

## Next.js weird cache stuff

- Since we are using tRPC for the server and client calls, we need to handle the cache part differently
  - For client side calls, can use `trpc/utils.testRouter.getTests.invalidate()`
  - For server side calls, it should be `router.push("/test"); router.refresh();`

## Forms usage

- Define schema
  - In `@lib/forms` using zod
  - DON'T use the default values here, add them in the useForm hook.
  - [ ] String fields require the `min(1)` if they are required, otherwise the "" is allowed
- Components (`@component/form`), which are different from the equivalents in (`@components/ui`)
  - `Input`: For both numbers and strings. If default value is not set it defaults to `undefined` but shows `""`
  - `Checkbox`, `Switch`: If default value not set, it automatically changes it to `false`
  - `Date`
  - `Select`
