import { IAddress } from "@/Types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const refresh = request.cookies.get("token")?.value;

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
    const res = await axios.get(`${process.env.API_URL}/api/address/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.access}`,
      },
    });
    return new NextResponse(JSON.stringify(res.data), {
      status: 200,
    });
  } catch (error) {
    console.log("get addresses error : ", error);
  }
}

export async function POST(request: NextRequest) {
  const body: Promise<IAddress> = request.json();

  const { user, city, province, plaque, description, postal_code, unit } =
    await body;
  try {
    const refresh = request.cookies.get("token")?.value;

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
    const res = await axios.post(
      `${process.env.API_URL}/api/address/`,
      {
        user,
        city,
        province,
        plaque,
        description,
        postal_code,
        unit: unit ? unit : 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access}`,
        },
      }
    );
    return new NextResponse(JSON.stringify(res.data), {
      status: 200,
    });
  } catch (error: any) {
    console.log("post address error : ", error);
  }
}
