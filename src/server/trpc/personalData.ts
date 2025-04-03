import { router, protectedProcedure } from "./context"
import { prisma } from "@/lib/db/prisma"
import { z } from "zod"

export const personalDataRouter = router({
    checkPersonalData: protectedProcedure.query(async ({ ctx }) => {
        const existing = await prisma.personalData.findUnique({
            where: { userId: ctx.user.id },
        })
        return { exists: !!existing }
    }),

    getPersonalData: protectedProcedure.query(async ({ ctx }) => {
        return prisma.personalData.findUnique({
            where: { userId: ctx.user.id },
        })
    }),

    updatePersonalData: protectedProcedure
        .input(
            z.object({
                data: z.record(z.any()), // Podés tipar como `zCVData` luego
            })
        )
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.user.id
            if (!userId) throw new Error("User not authenticated.")

            return prisma.personalData.upsert({
                where: { userId },
                update: { data: input.data },
                create: { userId, data: input.data },
            })
        }),
})
