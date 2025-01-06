import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.headers.get("authorization")?.replace("Bearer", "");

  if (!token) {
    return NextResponse.json({ message: "Token is missin" }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/auth/check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!data.success) {
      return NextResponse.json(
        { message: "Error in API call" },
        { status: response.status }
      );
    }
    // const headerAuth = response.headers.get("authorization");
    // const res = NextResponse.json(data, { status: 200 });
    // res.headers.set("authorization", headerAuth);
    // Return the API response to the client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in proxy API route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
