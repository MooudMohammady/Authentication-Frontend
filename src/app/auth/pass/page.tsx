"use client";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Login_Password_Schema } from "@/validations";

export default function Login_Password() {
  return (
    <main className="h-screen grid place-items-center">
      <Formik
        initialValues={{ password: "" }}
        validationSchema={Login_Password_Schema}
        onSubmit={async (value) => {
          console.log(value);
        }}>
        <Form className="sm:shadow-md p-5 rounded-md flex flex-col gap-2 max-w-xs w-full">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 font-bold text-center text-3xl">
            Teftaco
          </span>
          <label
            htmlFor="password"
            className="text-sm text-zinc-500"></label>
          <ErrorMessage id="password" name="password">
            {(err) => <span className="text-red-500">{err}</span>}
          </ErrorMessage>
          <Field
            id="password"
            name="password"
            type='password'
            placeholder="لطفا رمز عبور خود را وارد کنید ..."
            className="border p-2 rounded-md focus:border-sky-500 focus:caret-sky-500 focus:outline-none"
          />
          <a href="#ورود با زمر یکبار مصرف" className="text-sm text-sky-500">ورود با زمر یکبار مصرف ←</a>
          <a href="#تغییر رمز عبور" className="text-sm text-sky-500">تغییر رمز عبور ←</a>
          <button
            type="submit"
            className="py-2 text-white rounded-md bg-purple-700 hover:bg-purple-600 transition-colors mt-3">
            ورود
          </button>
        </Form>
      </Formik>
    </main>
  );
}
