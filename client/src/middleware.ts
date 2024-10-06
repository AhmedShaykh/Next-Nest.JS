import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const { pathname, origin } = request.nextUrl;

    let token = request.cookies.get("token")?.value;

    try {

        if (pathname === "/login") {

            if (token) return NextResponse.redirect(new URL(`${origin}`, request.url));

            return NextResponse.next();
        }

        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

    } catch (error) {

        console.log(error);

    }

};

export const config = {
    matcher: ["/", "/login"]
};