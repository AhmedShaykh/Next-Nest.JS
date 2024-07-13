import { NextResponse } from "next/server";
import authConfig from "./lib/auth.config";
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes
} from "./lib/routes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {

    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {

        return null;

    }

    if (isAuthRoute) {

        if (isLoggedIn) {

            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));

        }

        return null;

    }

    if (!isLoggedIn && !isPublicRoute) {

        let callBackUrl = nextUrl.pathname;

        if (nextUrl.search) {

            callBackUrl += nextUrl.search;

        }

        const encodedCallBackUrl = encodeURIComponent(callBackUrl);

        return NextResponse.redirect(new URL(
            `/auth/login?callBackUrl=${encodedCallBackUrl}`,
            nextUrl
        ));

    }

    return null;

});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};