import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow access to public API
  const publicApiPaths = ["/api/users/login", "/api/users/signup"];
  if (publicApiPaths.includes(path)) {
    return NextResponse.next();
  }

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  // If logged in and accessing login or signup, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If not logged in and accessing protected path, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request
  return NextResponse.next();
}

// Apply middleware to these paths
export const config = {
  matcher: ["/login", "/signup", "/add-book", "/profile", "/api/users/:path*"],
};
