"use client";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "@/validations";

export default function Login() {
  //TODO برسی وارد بودن یا نبودن کاربر با ارسال اولیه شماره موبایل شاید
  return (
    <main className="h-screen grid place-items-center">
      <Formik
        initialValues={{ phone_number_or_email: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (value) => {
          console.log(value);
        }}>
        <Form className="shadow-md p-5 rounded-md flex flex-col gap-2 max-w-xs w-full">
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
            className="border p-2 rounded-md focus:border-sky-500 focus:caret-sky-500 focus:outline-none"
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
            className="py-2 text-white rounded-md bg-purple-700 hover:bg-purple-600 transition-colors">
            ارسال کد تایید
          </button>
        </Form>
      </Formik>
    </main>
  );
}
