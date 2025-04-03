import { router, protectedProcedure } from "./context"
import { prisma } from "@/lib/db/prisma"
import { emptyCVData } from "@/lib/defaults"
import { z } from "zod"

export const resumeRouter = router({
    getUserResumes: protectedProcedure.query(async ({ ctx }) => {
        return prisma.resume.findMany({
            where: { userId: ctx.user.id },
            orderBy: { createdAt: "desc" },
        })
    }),

    createResume: protectedProcedure
        .input(
            z.object({
                title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (!ctx.user.id) throw new Error("No tienes permisos para editar este CV")
            return prisma.resume.create({
                data: {
                    title: input.title,
                    userId: ctx.user.id,
                    content: emptyCVData,
                },
            })
        }),

    updateResume: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
                content: z.any().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const resume = await prisma.resume.findUnique({ where: { id: input.id } })

            if (!resume) throw new Error("CV no encontrado")
            if (resume.userId !== ctx.user.id) throw new Error("No tienes permisos para editar este CV")

            return prisma.resume.update({
                where: { id: input.id },
                data: {
                    ...(input.title && { title: input.title }),
                    ...(typeof input.content !== "undefined" && Object.keys(input.content).length > 0 && { content: input.content }),
                }

            })
        }),

    deleteResume: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const resume = await prisma.resume.findUnique({ where: { id: input.id } })

            if (!resume) throw new Error("CV no encontrado")
            if (resume.userId !== ctx.user.id) throw new Error("No tienes permisos para eliminar este CV")

            return prisma.resume.delete({ where: { id: input.id } })
        }),

    getResumeById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const resume = await prisma.resume.findUnique({
                where: { id: input.id },
            })

            if (!resume || resume.userId !== ctx.user.id) {
                throw new Error("No tienes permisos para acceder a este CV")
            }

            return resume
        }),
})
