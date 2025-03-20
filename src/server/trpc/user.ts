import { router, publicProcedure, protectedProcedure } from "./context";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

export const userRouter = router({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return prisma.user.findUnique({
      where: { id: ctx.user.id },
    });
  }),

  updateUser: protectedProcedure
    .input(z.object({ name: z.string().optional(), image: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      return prisma.user.update({
        where: { id: ctx.user.id },
        data: input,
      });
    }),
});
