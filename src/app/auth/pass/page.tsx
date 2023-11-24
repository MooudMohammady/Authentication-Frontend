"use client";
import React, { useCallback, useMemo, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Login_Password_Schema } from "@/validations";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";

export default function Login_Password({
  searchParams,
}: {
  searchParams: { phone_number_or_email: string; is_exists: string };
}) {
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const goToOTP = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsSending(true);
    if (searchParams.is_exists == "true") {
      await axios
        .get(
          `/api/users/send-login-otp?phone_number_or_email=${searchParams.phone_number_or_email}`
        )
        .then((res) => {
          alert(res.data.message);
          router.push(
            `/auth/otp?is_exists=${searchParams.is_exists}&phone_number_or_email=${searchParams.phone_number_or_email}`
          );
          setIsSending(false);
        })
        .catch((err) => {
          console.log(err);
          setIsSending(false);
        });
    }
  }, []);

  return (
    <main className="h-screen grid place-items-center">
      <Formik
        initialValues={{ password: "" }}
        validationSchema={Login_Password_Schema}
        onSubmit={async (value) => {
          setIsSending(true);
          if (searchParams.is_exists == "true") {
            await axios
              .post(`/api/users/login/password`, {
                username: searchParams.phone_number_or_email,
                password: value.password,
              })
              .then((res) => {
                console.log(res);
                alert("شما با موفقیت وارد شدید");
                router.push('/admin')
                setIsSending(false);
              })
              .catch((err) => {
                console.log(err);
                setIsSending(false);
              });
          } else {
            await axios
              .post(`/api/users`, {
                phone_number_or_email: searchParams.phone_number_or_email,
                password: value.password,
              })
              .then((res) => {
                console.log(res);
                alert(
                  "شما با موفقیت ثبت نام شدید . حالا با ایمیل یا شماره تون وارد بشید"
                );
                router.push("/auth");
                setIsSending(false);
              })
              .catch((err) => {
                console.log(err);
                setIsSending(false);
              });
          }
        }}>
        <Form className="sm:shadow-md p-5 rounded-md flex flex-col gap-2 max-w-xs w-full bg-white/50 backdrop-blur-sm">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 font-bold text-center text-3xl">
            Teftaco
          </span>
          <p className="text-sm text-zinc-500"></p>
          <ErrorMessage id="password" name="password">
            {(err) => <span className="text-red-500">{err}</span>}
          </ErrorMessage>
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="لطفا رمز عبور خود را وارد کنید ..."
            className="border p-2 rounded-md ring-0 ring-sky-500/50 transition focus:ring-2 focus:border-sky-500 focus:caret-sky-500 focus:outline-none"
          />
          <a href="#تغییر رمز عبور" className="text-sm text-sky-500">
            تغییر رمز عبور ←
          </a>
          {searchParams.is_exists == "true" ? (
            <a
              href="/auth/otp"
              onClick={goToOTP}
              className="text-sm text-sky-500 text-right">
              ورود با رمز یکبار مصرف ←
            </a>
          ) : null}
          <button
            type="submit"
            disabled={isSending}
            className="py-2 text-white rounded-md ring-0 ring-purple-500/50 focus:ring-4 bg-purple-700 hover:bg-purple-600 transition flex gap-3 justify-center items-center disabled:opacity-50">
            {searchParams.is_exists == "true" ? "ورود" : "ثبت نام"}
            <LuLoader2 className="text-xl animate-spin" hidden={!isSending} />
          </button>
        </Form>
      </Formik>
    </main>
  );
}
