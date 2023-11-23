import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const phone_number_or_email = searchParams.get("phone_number_or_email");
  const otp = searchParams.get("otp");
  try {
    const res = await axios.get(
      `${process.env.API_URL}/api/users/validate-sign-up-otp?phone_number_or_email=${phone_number_or_email}&otp=${otp}`,
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
  } catch (error:any) {
    console.log("users validate-sign-up-otp error : ", error);
    return new NextResponse(
      JSON.stringify({
        ...error.response.data,
      }),
      { status: error.response.status }
    );
  }
}
