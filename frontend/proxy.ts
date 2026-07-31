import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "./app/constants/auth";
import { ROUTES } from "./app/constants/routes";

const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD];
const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.SETTINGS];

// Normalize away trailing slashes so "/login" and "/login/" match the same way
const normalize = (path: string) =>
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

export default function proxy(request: NextRequest) {
    const pathname = normalize(request.nextUrl.pathname);
    const isAuthed = Boolean(request.cookies.get(AUTH_COOKIE)?.value);

    const isAuthRoute = AUTH_ROUTES.some(
        (route) => pathname === normalize(route),
    );
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(normalize(route)),
    );

    // Logged-in users shouldn't see login/register/forgot-password again
    if (isAuthed && isAuthRoute) {
        return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    }

    // Logged-out users shouldn't reach protected pages
    if (!isAuthed && isProtectedRoute) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login/:path*",
        "/register/:path*",
        "/forgot-password/:path*",
        "/dashboard/:path*",
        "/settings/:path*",
    ],
};
