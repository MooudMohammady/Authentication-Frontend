"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";

export default function Login_OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index : number, value : string) => {
    // اگر عدد وارد شده معتبر نباشد، اجازه ورود آن را ندهید
    if (!/^[0-9]*$/.test(value)) {
      return;
    }

    // به فیلد بعدی منتقل شوید اگر فیلد فعلی پر شده است
    if (value !== "" && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)!.focus();
    }

    // به روز رسانی مقدار فیلد
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleKeyDown = (index:number, event : React.KeyboardEvent<HTMLInputElement>) => {
    // اگر دکمه بک‌اسپیس فشرده شده باشد و مقدار فیلد خالی نباشد، مقدار فیلد پاک شود و به فیلد قبلی منتقل شویم
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
        otp: otp.join(""), // ترکیب کردن اطلاعات وارد شده به یک رشته
      }}
        onSubmit={async (value) => {
          console.log(value);
        }}>
        <Form className="shadow-md p-5 rounded-md flex flex-col gap-2 max-w-xs w-full">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 font-bold text-center text-3xl">
            Teftaco
          </span>
          <h1 className="text-xl">لطفا کد تایید را وارد کنید</h1>
          <p className="text-sm text-zinc-500">کد تایید به شماره موبایل 0913××××× ارسال شد</p>
          <Link href={'/auth'} className="text-sm text-sky-500">شماره موبایل خود را ویرایش کنید</Link>
          <div className="flex gap-2" dir="ltr">
            {otp.map((value, index) => (
              <Field
                key={index}
                type="text"
                name={`otp-${index}`}
                id={`otp-input-${index}`}
                value={value}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                maxLength={1}
                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-700 text-center w-full"
              />
            ))}
          </div>
          <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
          <button className="text-sm text-sky-500">دریافت مجدد کد تایید</button>
          <button
            type="submit"
            className="py-2 text-white rounded-md bg-purple-700 hover:bg-purple-600 transition-colors">
            تایید
          </button>
        </Form>
      </Formik>
    </main>
  );
}
