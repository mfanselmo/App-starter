import { testsRouter } from "./routers/test";
import { router } from "./trpc";

export const appRouter = router({
  testsRouter: testsRouter,
});

export type AppRouter = typeof appRouter;
