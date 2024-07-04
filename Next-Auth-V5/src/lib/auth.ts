import { PrismaAdapter } from "@next-auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./db";
import NextAuth from "next-auth";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
});