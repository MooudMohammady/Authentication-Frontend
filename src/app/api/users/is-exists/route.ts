import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
  const {searchParams} = new URL(request.url);
  const phone_number_or_email = searchParams.get("phone_number_or_email");
  try {
    const res = await axios.get(`${process.env.API_URL}/api/users/is-exists?phone_number_or_email=${phone_number_or_email}`,{
      headers:{
        'Content-Type': 'application/json',
        'X-CSRFToken':process.env.X_CSRFToken
      }
    });
    return new NextResponse(JSON.stringify({
      ...res.data
    }),{status:200})
  } catch (error) {
    console.log('users is-exists error : ',error);
  }
}