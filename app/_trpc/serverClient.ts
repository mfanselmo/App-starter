import { appRouter } from "@/server";
import { createCallerFactory, createTRPCContext } from "@/server/trpc";

const createCaller = createCallerFactory(appRouter);
export const serverClient = createCaller(createTRPCContext());
