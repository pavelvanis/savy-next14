import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();

    // Validate data

    // Check if user exist in database ..

    // Check if password match ..

    // Generate JWT

    return NextResponse.json({ message: "Logged in!" });
  } catch (error) {
    console.error(error);
  }
};
