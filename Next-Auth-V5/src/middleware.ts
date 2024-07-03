import authConfig from "./lib/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => { });

export const config = {
    matcher: [
        "/auth/register",
        "/auth/login"
    ]
};