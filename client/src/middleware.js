import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("accessToken");

  // List of routes that should be accessible without authentication
  const publicRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset",
    "/auth/register/otp",
    "/auth/reset/password",
  ];

  console.log(url.pathname);

  // Allow static files to pass through
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/logo.svg")
  ) {
    return NextResponse.next();
  }

  // If the user is not logged in and trying to access a protected route, redirect to /auth/login
  if (!token && !publicRoutes.includes(url.pathname)) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // If the user is logged in and trying to access a public route, keep to the current page
  if (token && publicRoutes.includes(url.pathname)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If the user is logged in and accessing a protected route or not logged in and accessing a public route, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - static (custom static files)
     */
    "/((?!api|_next/static|static).*)",
  ],
};
