import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
  const {searchParams} = new URL(request.url);
  const phone_number_or_email = searchParams.get("phone_number_or_email");
  try {
    const res = await axios.get(`${process.env.API_URL}/api/users/send-login-otp?phone_number_or_email=${phone_number_or_email}`,{
      headers:{
        'Content-Type': 'application/json',
        Authorization : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwODI3NTU2LCJpYXQiOjE3MDA3NDExNTYsImp0aSI6IjM2MzNhZWVkOGJhYzRlM2JiNzYyOTVmYjYzNWY5NjJkIiwidXNlcl9pZCI6ImZkMmM4MjRlLTBkMTAtNDFiMC1hYmVmLWI4N2ZhZGM1YTdiNiJ9.uexFmsWUDKvDNiTnzE-Rl98aG9OS_pqMTSZzCjLcIMk'
      }
    });
    return new NextResponse(JSON.stringify({
      ...res.data
    }),{status:200})
  } catch (error) {
    console.log('users send-login-otp error : ',error);
  }
}