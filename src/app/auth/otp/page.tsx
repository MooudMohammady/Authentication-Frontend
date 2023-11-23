"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { LuLoader2 } from "react-icons/lu";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login_OTP({
  searchParams,
}: {
  searchParams: { phone_number_or_email: string; is_exists: string };
}) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) {
      return;
    }
    if (value !== "" && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)!.focus();
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      document.getElementById(`otp-input-${index - 1}`)!.focus();
    }
  };

  return (
    <main className="h-screen grid place-items-center">
      <Formik
        initialValues={{
          otp: otp.join(""),
        }}
        onSubmit={async (value) => {
          setError(false);
          setIsSending(true);
          if (searchParams.is_exists == "true") {
            await axios
              .post(`/api/users/login/otp`, {
                username: searchParams.phone_number_or_email,
                otp: otp.join(""),
              })
              .then((res) => {
                console.log(res);
                alert('شما با موفقیت وارد شدید')
                setIsSending(false);
              })
              .catch((err) => {
                console.log(err);
                setIsSending(false);
              });
          } else {
            await axios
              .get(
                `/api/users/validate-sign-up-otp?phone_number_or_email=${
                  searchParams.phone_number_or_email
                }&otp=${otp.join("")}`
              )
              .then((res) => {
                console.log(res);
                alert(res.data.message);
                router.push(
                  `/auth/pass?is_exists=${searchParams.is_exists}&phone_number_or_email=${searchParams.phone_number_or_email}`
                );
                setIsSending(false);
              })
              .catch((err) => {
                console.log(err);
                setIsSending(false);
                setError(true);
              });
          }
        }}>
        <Form className="sm:shadow-md p-5 rounded-md flex flex-col gap-2 max-w-xs w-full bg-white/50 backdrop-blur-sm">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 font-bold text-center text-3xl">
            Teftaco
          </span>
          <h1 className="text-xl">لطفا کد تایید را وارد کنید</h1>
          <p className="text-sm text-zinc-500">
            کد تایید به شماره موبایل یا ایمیل{" "}
            <span>{searchParams.phone_number_or_email}</span> ارسال شد
          </p>
          <span className="text-sm text-red-500">{error && 'اشتباه است'}</span>
          <Link href={"/auth"} className="text-sm text-sky-500">
            شماره موبایل خود را ویرایش کنید
          </Link>
          <div className="flex gap-2" dir="ltr">
            {otp.map((value, index) => (
              <Field
                key={index}
                type="text"
                name={`otp-${index}`}
                id={`otp-input-${index}`}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(index, e)
                }
                maxLength={1}
                max={1}
                className="no-spinner p-2 rounded-md ring-0 ring-sky-500/50 transition focus:ring-2 border border-gray-300 focus:outline-none focus:border-sky-500 text-center w-full caret-sky-500"
              />
            ))}
          </div>
          <ErrorMessage
            name="otp"
            component="div"
            className="text-red-500 text-sm"
          />
          <button className="text-sm text-sky-500">دریافت مجدد کد تایید</button>
          <button
            type="submit"
            disabled={isSending}
            className="py-2 text-white rounded-md ring-0 ring-purple-500/50 focus:ring-4 bg-purple-700 hover:bg-purple-600 transition flex gap-3 justify-center items-center disabled:opacity-50">
            ارسال کد تایید{" "}
            <LuLoader2 className="text-xl animate-spin" hidden={!isSending} />
          </button>
        </Form>
      </Formik>
    </main>
  );
}
