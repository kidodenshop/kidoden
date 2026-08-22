import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/adminAuth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define paths that are public or shouldn't be blocked
  const isLoginPage = pathname === "/admin";
  const isLoginApi = pathname === "/api/admin/login";

  // Check for session cookie
  const sessionCookie = request.cookies.get("admin_session")?.value;
  let session = null;

  if (sessionCookie) {
    session = await decrypt(sessionCookie);
  }

  // Handle Admin Page routes
  if (pathname.startsWith("/admin")) {
    if (isLoginPage) {
      // If already logged in, redirect to dashboard
      if (session) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    // If not logged in and trying to access protected admin page, redirect to login
    if (!session) {
      const redirectUrl = new URL("/admin", request.url);
      if (pathname !== "/admin/dashboard") {
        redirectUrl.searchParams.set("redirect", pathname);
      }
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Handle Admin API routes
  if (pathname.startsWith("/api/admin")) {
    if (isLoginApi) {
      return NextResponse.next();
    }

    // Protect all other admin APIs
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized access to admin API" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  return NextResponse.next();
}

// Configure routes to run proxy on
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
