import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Verify admin access
        if (req.nextUrl.pathname.startsWith("/admin") && 
            !req.nextauth.token?.isAdmin) {
            return NextResponse.redirect(
                new URL("/login?error=NotAuthorized", req.url)
            );
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"]
};