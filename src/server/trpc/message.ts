import { router, protectedProcedure } from "./context";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

export const messageRouter = router({
  getMessagesByChat: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input }) => {
      return prisma.chatMessage.findMany({ where: { chatId: input.chatId } });
    }),

  sendMessage: protectedProcedure
    .input(z.object({ chatId: z.string(), message: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.chatMessage.create({
        data: { chatId: input.chatId, sender: "USER", message: input.message },
      });
    }),
});
