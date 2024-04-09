import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { user } = await getAuthSession();

  const params = req.nextUrl.searchParams;

  const state = params.get("state");

  const error = params.get("error");
  let message = params.get("message");

  // Return if user is not authenticated
  if (state !== user.permanentUserId) {
    return NextResponse.json({ message: "Invalid state" }, { status: 401 });
  }

  // Return if there's an error
  if (error) {
    // Set the message based on the error type
    switch (error) {
      case "USER_CANCELLED":
        message = "User cancelled the flow";
        break;

      default:
        break;
    }
    return NextResponse.redirect(
      `http://localhost:3000/web/settings/credentials?status=error&message=${message}`
    );
  }

  // Succefuly added credentials
  return NextResponse.redirect(
    "http://localhost:3000/web/settings/credentials?status=success&message=Credentials added successfully"
  );
};
