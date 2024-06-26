import { NextRequest, NextResponse } from "next/server";

// This is a route that responds to GET and POST requests

export const GET = (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({ message: "Hello, world!" });
};

export const POST = (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({ message: "Hello, world!" });
};
