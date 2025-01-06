import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const active = searchParams.get("active");

  try {
    const response = await fetch(
      `${process.env.NEXT_API_POST_URL}/posts?type=${type}&category=${category}&active=${active}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "js-response-modify": 1,
        },
        cache: "no-cache",
      }
    );

    const data = await response.json();
    if (!data.success || !response.ok) {
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
