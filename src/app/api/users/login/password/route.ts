import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: Promise<{ username: string; password: string }> = request.json();

  try {
    const res = await axios.post(
      `${process.env.API_URL}/api/users/login/password/`,
      {
        username: (await body).username,
        password: (await body).password,
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
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${res.data.refresh}; httpOnly=true; path=/`,
        },
      }
    );
  } catch (error) {
    console.log("users login-password error : ", error);
  }
}
