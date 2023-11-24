import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const refresh = request.cookies.get('token')?.value
    
    if (!refresh) {
      return new NextResponse(JSON.stringify({
        message:'token not found!'
      }),{status:404})
    }
    const {data} = await axios.post(
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
    const res = await axios.get(
      `${process.env.API_URL}/api/users/get-id`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${data.access}`
        },
      }
    );
    return new NextResponse(
      JSON.stringify({
        ...res.data,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("users get-id error : ", error);
  }
}
