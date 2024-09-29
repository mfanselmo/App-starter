import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { editTestFormSchema } from "@/lib/forms/test/edit";
import { newTestFormSchema } from "@/lib/forms/test/new";

import { privateProcedure, router } from "../trpc";

export const testsRouter = router({
  getTests: privateProcedure.input(z.object({})).query(async ({ ctx }) => {
    const tests = await ctx.prisma.test.findMany({
      where: {
        userId: ctx.userId,
      },
      select: {
        id: true,
        stringField: true,
        dateField: true,
      },
    });

    return tests;
  }),
  getTest: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const test = await ctx.prisma.test.findUnique({
        where: { id: input.id, userId: ctx.userId },
      });

      if (!test) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "An unexpected error occurred, please try again later.",
          // optional: pass the original error to retain stack trace
          // cause: theError,
        });
      }

      return test;
    }),
  createTest: privateProcedure
    .input(newTestFormSchema)
    .mutation(async ({ ctx, input }) => {
      const test = await ctx.prisma.test.create({
        data: { ...input, userId: ctx.userId },
      });

      return test;
    }),
  updateTest: privateProcedure
    .input(
      z.object({
        id: z.string(),
        data: editTestFormSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const test = await ctx.prisma.test.update({
        where: { id: input.id },
        data: input.data,
      });

      return test;
    }),
  deleteTest: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const test = await ctx.prisma.test.delete({
        where: { id: input.id },
      });

      return test;
    }),
});
