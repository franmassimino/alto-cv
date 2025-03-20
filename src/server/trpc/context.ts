import { initTRPC } from "@trpc/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth";

export const createContext = async () => {
  const session = await auth()
  return { prisma, session };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) throw new Error("No autorizado");

  return next({ ctx: { ...ctx, user: ctx.session.user } });
});

