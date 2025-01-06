import { NextResponse } from "next/server";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const response = await fetch(
      `${process.env.NEXT_API_POST_URL}/invoice/qpay/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "js-response-modify": 1,
        },
      }
    );

    const data = await response.json();
    console.log("data: ", data);
    if (!data.success || !response.ok) {
      return NextResponse.json(
        { message: "Error in API call" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
