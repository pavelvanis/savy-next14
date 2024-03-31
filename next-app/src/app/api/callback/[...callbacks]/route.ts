import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler for Tink callbacks
 */
export const GET = async (req: NextRequest) => {
  try {
    // Check session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { update } = useSession();

    // Take params
    const params = req.nextUrl.searchParams;
    console.log(params);

    const state = params.get("state");
    const credentialsId = params.get("credentialsId");

    update({ credentialsId });

    return NextResponse.json({ message: "Hello from callback" });
  } catch (error) {
    // Handle and show errors to user
    console.error(error);
  }
};
