import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStorage = cookies();
  const refresh = cookieStorage.get("token")?.value;
  try {
    if (!refresh) {
      return new NextResponse(
        JSON.stringify({
          message: "token not found!",
        }),
        { status: 404 }
      );
    }
    const { data } = await axios.post(
      `${process.env.API_URL}/api/token/refresh/`,
      {
        refresh,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await axios.get(`${process.env.API_URL}/api/users/get-id`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.access}`,
      },
    });
    return new NextResponse(JSON.stringify(res.data), {
      status: 200,
    });
  } catch (error) {
    console.log("users get-id error : ", error);
  }
}
