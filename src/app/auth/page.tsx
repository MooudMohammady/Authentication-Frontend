"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "@/validations";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import Link from "next/link";

export default function Login() {
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  return (
    <main className="h-screen grid place-items-center">
      <Formik
        initialValues={{ phone_number_or_email: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (value) => {
          setIsSending(true);
          await axios
            .get(`/api/users/is-exists`, {
              params: {
                phone_number_or_email: value.phone_number_or_email,
              },
            })
            .then(async (res) => {
              console.log(res);
              
              let is_exists = res.data.data.is_exists;
              if (res.data.data.is_exists) {
                router.push(
                  `/auth/pass?is_exists=${is_exists}&phone_number_or_email=${value.phone_number_or_email}`
                );
              } else {
                await axios
                  .get(
                    `/api/users/send-sign-up-otp?phone_number_or_email=${value.phone_number_or_email}`
                  )
                  .then((res) => {
                    alert(res.data.message)
                    router.push(
                      `/auth/otp?is_exists=${is_exists}&phone_number_or_email=${value.phone_number_or_email}`
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              setIsSending(false);
            })
            .catch((err) => {
              console.log(err);
              setIsSending(false);
            });
        }}>
        <Form className="sm:shadow-md p-5 rounded-md flex flex-col gap-2 max-w-xs w-full bg-white/50 backdrop-blur-sm">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 font-bold text-center text-3xl">
            Teftaco
          </span>
          <h1 className="text-xl">ورود | ثبت نام</h1>
          <label
            htmlFor="phone_number_or_email"
            className="text-sm text-zinc-500"></label>
          <ErrorMessage id="phone_number_or_email" name="phone_number_or_email">
            {(err) => <span className="text-red-500">{err}</span>}
          </ErrorMessage>
          <Field
            id="phone_number_or_email"
            name="phone_number_or_email"
            placeholder="لطفا شماره موبایل یا ایمیل خود را وارد کنید"
            className="border p-2 rounded-md ring-0 ring-sky-500/50 transition focus:ring-2 focus:border-sky-500 focus:caret-sky-500 focus:outline-none"
          />
          <p className="text-[12px] text-zinc-400">
            ورود شما به معنی قبول{" "}
            <a href="#صفحه قوانین" className="text-sky-500">
              قوانین تفتاکو
            </a>{" "}
            می باشد.
          </p>
          <button
            type="submit"
            disabled={isSending}
            className="py-2 text-white rounded-md ring-0 ring-purple-500/50 focus:ring-4 bg-purple-700 hover:bg-purple-600 transition flex gap-3 justify-center items-center disabled:opacity-50">
            ارسال کد تایید{" "}
            <LuLoader2 className="text-xl animate-spin" hidden={!isSending} />
          </button>
          <Link href='/admin'>admin</Link>
        </Form>
      </Formik>
    </main>
  );
}
