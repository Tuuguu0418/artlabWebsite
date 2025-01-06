import { NextResponse } from "next/server";

export async function POST(req) {
  const updatedPost = await req.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_API_POST_URL}/admin/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      }
    );

    const data = await response.json();
    if (!data.success || !response.ok) {
      return NextResponse.json(
        { message: "Error in API call" },
        { status: response.status }
      );
    }
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
