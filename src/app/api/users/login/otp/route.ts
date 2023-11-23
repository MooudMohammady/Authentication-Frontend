import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: Promise<{ username: string; otp: number | string }> =
    request.json();

  try {
    const res = await axios.post(
      `${process.env.API_URL}/api/users/login/otp/`,
      {
        username: (await body).username,
        otp: (await body).otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return new NextResponse(
      JSON.stringify({
        ...res.data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("users login-otp error : ", error);
  }
}
