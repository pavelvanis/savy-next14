import { auth } from "@/lib/auth";
import { tinkCallbackController } from "@/lib/tink/tink-callback-controller";
import { log } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler for Tink callbacks
 */
export const GET = async (req: NextRequest) => {
  const callbackPath = req.nextUrl.pathname.split("/api/callback")[1];
  const callbackUrl = new URL(callbackPath, req.nextUrl.origin);

  try {
    // Check session
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Take params
    const searchParams = req.nextUrl.searchParams;

    const tinkCallback = tinkCallbackController(searchParams);

    // Redirect to callback URL with status and message
    if (tinkCallback) {
      callbackUrl.searchParams.set("status", tinkCallback.status);
      callbackUrl.searchParams.set(
        "message",
        encodeURIComponent(tinkCallback.message)
      );

      return NextResponse.redirect(callbackUrl);
    }

    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    callbackUrl.searchParams.set("status", "error");
    callbackUrl.searchParams.set(
      "message",
      encodeURIComponent("Something went wrong")
    );

    log(error);
    return NextResponse.redirect(callbackUrl);
  }
};
