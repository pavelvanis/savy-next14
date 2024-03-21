import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Catch-all route segment for /api/callback/[...callback] to handle callbacks
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);

    // Make route accesable only if user is authenticated
    if (!session) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    // Get the CSRF token from cookies
    const csrf_token = cookies().get("next-auth.csrf-token")?.value;

    // TODO: Better handling when CSRF token is not available
    if (!csrf_token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const params = req.nextUrl.searchParams;

    const state = params.get("state");

    // TODO: Better handling when state is not equal to csrf_token
    if (csrf_token !== state) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.json({
      params: params.toString(),
    });
  } catch (error) {
    console.error("GET api/callback[...callback] - ", error);
  }
};
