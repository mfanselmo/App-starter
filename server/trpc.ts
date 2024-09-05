import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import prisma from "@/lib/prisma";

export const createTRPCContext = () => {
  return {
    prisma,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    let message;
    if (error.cause instanceof ZodError) {
      message = Object.entries(error.cause.flatten().fieldErrors).reduce(
        (acc, cause) => {
          const field = cause[0];
          const mes = (cause[1] || [""]).join("");

          return `${acc}\n${field} - ${mes}`.trimStart();
        },
        "",
      );
    } else if (error.cause instanceof Prisma.PrismaClientKnownRequestError) {
      message = error.cause.message;
    } else if (error instanceof TRPCError) {
      message = error.message;
    }

    return {
      ...shape,
      data: {
        code: shape.data.code,
        message,
      },
    };
  },
});
export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(async ({ next }) => {
  const user = await currentUser();

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      userId: user.id,
    },
  });
});

export const privateProcedure = t.procedure.use(isAuthed);
