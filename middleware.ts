import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isOnDashboard = pathname.startsWith("/dashboard");
  const isOnLogin = pathname === "/login";
  const isOnRoot = pathname === "/";

  // 1. Unauthenticated users trying to access protected dashboard routes -> redirect to /login
  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Authenticated users trying to access login or root page -> redirect directly to /dashboard
  if ((isOnLogin || isOnRoot) && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/login", "/"],
};
