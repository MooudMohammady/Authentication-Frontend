import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: Promise<{ phone_number_or_email: string; password: string }> =
    request.json();
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let res;
  try {
    res = await axios.post(
      `${process.env.API_URL}/api/users/`,
      {
        phone_number: emailRegex.test((await body).phone_number_or_email)
          ? ""
          : (
              await body
            ).phone_number_or_email,
        email: emailRegex.test((await body).phone_number_or_email)
          ? (
              await body
            ).phone_number_or_email
          : "",
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
      { status: 200 }
    );
  } catch (error) {
    console.log("users error : ", error);
  } finally {
    await axios
      .post(
        `${process.env.API_URL}/api/buyers/`,
        {
          user: res!.data.id,
          national_code: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }
}
