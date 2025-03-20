import { router, protectedProcedure } from "./context";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

export const resumeRouter = router({
    getUserResumes: protectedProcedure.query(async ({ ctx }) => {
        return prisma.resume.findMany({
            where: { userId: ctx.user.id },
            orderBy: { createdAt: "desc" },
        });
    }),

    createResume: protectedProcedure
        .input(
            z.object({
                title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const totalResumes = await prisma.resume.count({ where: { userId: ctx.user.id } });

            if (!ctx.user.id) {
                throw new Error("No puedes tener más de 10 CVs");
            }

            return prisma.resume.create({
                data: {
                    title: input.title,
                    userId: ctx.user.id,
                    content: "",
                },
            });
        }),

    updateResume: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const resume = await prisma.resume.findUnique({ where: { id: input.id } });

            if (!resume) throw new Error("CV no encontrado");
            if (resume.userId !== ctx.user.id) throw new Error("No tienes permisos para editar este CV");

            return prisma.resume.update({
                where: { id: input.id },
                data: { title: input.title },
            });
        }),

    deleteResume: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const resume = await prisma.resume.findUnique({ where: { id: input.id } });

            if (!resume) throw new Error("CV no encontrado");
            if (resume.userId !== ctx.user.id) throw new Error("No tienes permisos para eliminar este CV");

            return prisma.resume.delete({ where: { id: input.id } });
        }),
});
