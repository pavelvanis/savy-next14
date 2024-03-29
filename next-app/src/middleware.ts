import { NextRequestWithAuth } from "next-auth/middleware";
import csrf from "edge-csrf";
import { NextResponse } from "next/server";

// initalize protection function
const csrfProtect = csrf({
  cookie: {
    name: "csrf-token",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});
export async function middleware(req: NextRequestWithAuth) {
  const response = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  return response;

  if (!pathname.startsWith("/api/auth/")) {
    // csrf protection
    const csrfError = await csrfProtect(req, response);

    // check result
    if (csrfError) {
      return new NextResponse("Invalid csrf token", { status: 403 });
    }
  }

  return response;
}
