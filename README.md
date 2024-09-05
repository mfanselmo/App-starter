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
  - `npm run  db-migrate` runs the initial migrations of the db (adds Test model)
  - `npm run prisma-generate` Loads the prisma model into the prisma object (so TS nows what is inside the db)
  - `npm run dev` Starts dev server

## DB Guide

- `npm run db-create-migration`: Will ask for a migration name and create it, doesn't run it
- `db-migrate`: Runs all pending migrations

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
