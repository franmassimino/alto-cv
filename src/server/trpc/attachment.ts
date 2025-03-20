import { router, protectedProcedure } from "./context";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

export const attachmentRouter = router({
    getAttachmentsByMessage: protectedProcedure
        .input(z.object({ chatMessageId: z.string() }))
        .query(async ({ input }) => {
            return prisma.attachment.findMany({ where: { chatMessageId: input.chatMessageId } });
        }),

    addAttachment: protectedProcedure
        .input(z.object({ chatMessageId: z.string(), fileUrl: z.string(), fileType: z.string() }))
        .mutation(async ({ input }) => {
            return prisma.attachment.create({ data: input });
        }),
});
