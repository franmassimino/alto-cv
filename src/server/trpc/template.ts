import { router, protectedProcedure } from "./context";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

export const templateRouter = router({
    getUserTemplates: protectedProcedure.query(async ({ ctx }) => {
        return prisma.template.findMany({ where: { userId: ctx.user.id } });
    }),

    createTemplate: protectedProcedure
        .input(z.object({ name: z.string(), description: z.string(), content: z.string(), type: z.enum(["PREDEFINED", "CUSTOM"]) }))
        .mutation(async ({ input, ctx }) => {
            if (!ctx.user.id) throw new Error("Usuario no autenticado");

            return prisma.template.create({
                data: { ...input, userId: ctx.user.id },
            });
        }),
});
