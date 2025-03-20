import { router, protectedProcedure } from "./context";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

export const chatRouter = router({
    getUserChats: protectedProcedure.query(async ({ ctx }) => {
        return prisma.chat.findMany({ where: { userId: ctx.user.id } });
    }),

    createChat: protectedProcedure
        .input(z.object({ resumeId: z.string().optional() }))
        .mutation(async ({ input, ctx }) => {
            if (!ctx.user.id) throw new Error("Usuario no autenticado");

            return prisma.chat.create({
                data: { resumeId: input.resumeId, userId: ctx.user.id },
            });
        }),
});
