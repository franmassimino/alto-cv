import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from '../db/prisma';
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
})