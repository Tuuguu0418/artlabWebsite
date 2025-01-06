import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();
  const payload = {
    username,
    password,
    type: "web.admin.panel",
  };

  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error in API call" },
        { status: response.status }
      );
    }
    const headerAuth = response.headers.get("authorization");
    const res = NextResponse.json(data, { status: 200 });
    res.headers.set("authorization", headerAuth);
    // Return the API response to the client
    // return NextResponse.json(data, { status: 200 });
    return res;
  } catch (error) {
    console.error("Error in proxy API route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
