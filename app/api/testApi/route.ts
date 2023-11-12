import { NextResponse } from "next/server";
// IMPORTANT: THIS IS HOW YOU MAKE AN API : https://www.youtube.com/watch?v=O-NGENb6LNg
// Make sure to add the route to the middleware.ts file

export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ message: "Hello from the API!" });
};

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ message: "no body!" });
  }
  const { category } = body;
  return NextResponse.json({ message: "Hello from the API!", category });
};
