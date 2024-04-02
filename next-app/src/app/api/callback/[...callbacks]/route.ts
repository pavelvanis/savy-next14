import { NextRequest, NextResponse } from "next/server";
import { auth, unstable_update } from "@/lib/auth";

/**
 * Handler for Tink callbacks
 */
export const GET = async (req: NextRequest) => {
  try {
    // Check session
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Take params
    const params = req.nextUrl.searchParams;
    console.log(params);

    const state = params.get("state");
    // TODO: Validate state

    const credentialsId = params.get("credentialsId");

    if (credentialsId) {
      const updated = await unstable_update({
        user: { ...session.user, credentialsId },
      });
      // console.log("updated", updated);
      // return NextResponse.redirect(new URL("/web", req.url));
    }

    return NextResponse.json({ message: "Hello from callback" });
  } catch (error) {
    // Handle and show errors to user
    console.error(error);
  }
};
