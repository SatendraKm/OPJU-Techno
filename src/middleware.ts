import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Allow request to continue if token exists
  // Token validation will happen on the server when needed
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/events-selection/:path*",
    "/team-details/:path*",
  ],
};
