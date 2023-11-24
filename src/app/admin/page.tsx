"use client";
import { IAddress } from "@/Types";
import DeleteAddressButton from "@/components/DeleteAddressButton";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { LuLoader2, LuPenSquare } from "react-icons/lu";
import AdminContext from "../contexts/AdminContext";
//@ts-ignore
const DescriptionInput = ({ field, form, ...props }) => {
  return <textarea {...field} {...props} />;
};

export default function AdminPage() {
  const [addresses, setAddresses] = useState<IAddress[]>();
  const [isSending, setIsSending] = useState(false);
  const [reFetchAddress, setReFetchAddress] = useState(false);

  const { userId } = useContext(AdminContext);

  useEffect(() => {
    (async () => {
      await axios
        .get("/api/address/")
        .then((res) => {
          setAddresses([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [reFetchAddress]);
  return (
    <main className="mx-auto max-w-6xl shadow-md p-2 sm:p-5 bg-white/50 backdrop-blur-sm space-y-5">
      <h1 className="text-2xl text-center">اضافه کردن ادرس</h1>
      <Formik
        initialValues={{
          city: "",
          province: "",
          plaque: "",
          unit: "",
          description: "",
          postal_code: "",
        }}
        onSubmit={async (value) => {
          setIsSending(true);
          await axios
            .post("/api/address/", {
              user: userId,
              ...value,
            })
            .then(() => {
              setReFetchAddress(!reFetchAddress);
              setIsSending(false);
            })
            .catch((err) => {
              console.log(err);
              setIsSending(false);
            });
        }}>
        <Form className="flex flex-wrap gap-5">
          <ErrorMessage id="province" name="province">
            {(err) => <span className="text-red-500">{err}</span>}
          </ErrorMessage>
          <Field
            id="province"
            name="province"
            placeholder="استان"
            className="border p-2 rounded-md ring-0 ring-sky-500/50 transition focus:ring-2 focus:border-sky-500 focus:caret-sky-500 focus:outline-none flex-grow"
          />
          <ErrorMessage id="city" name="city">
            {(err) => <span className="text-red-500">{err}</span>}
          </ErrorMessage>
          <Field
            id="city"
            name="city"
            placeholder="شهر"
            className="border p-2 rounded-md ring-0 ring-sky-500/50 transition focus:ring-2 focus:border-sky-500 focus:caret-sky-500 focus:outline-none flex-grow"
          />
          <ErrorMessage id="plaque" name="plaque">
            {(err) => <span className="text-red-500">{err}</span>}
          </ErrorMessage>
          <Field
            id="plaque"
            name="plaque"
            type="number"
            placeholder="پلاک"
            className="border p-2 rounded-md ring-0 ring-sky-500/50 transition focus:ring-2 focus:border-sky-500 focus:caret-sky-500 focus:outline-none flex-grow"
          />
          <Field
            id="postal_code"
            name="postal_code"
            type="string"
            placeholder="کدپستی"
            className="border p-2 rounded-md ring-0 ring-sky-500/50 transition focus:ring-2 focus:border-sky-500 focus:caret-sky-500 focus:outline-none flex-grow"
          />
          <Field
            id="unit"
            name="unit"
            type="number"
            placeholder="واحد (اختیاری)"
            className="border p-2 rounded-md ring-0 ring-sky-500/50 transition focus:ring-2 focus:border-sky-500 focus:caret-sky-500 focus:outline-none flex-grow"
          />
          <Field
            id="description"
            name="description"
            component={DescriptionInput}
            placeholder="توضیحات (اختیاری)"
            className="border p-2 rounded-md ring-0 ring-sky-500/50 transition focus:ring-2 focus:border-sky-500 focus:caret-sky-500 focus:outline-none w-full"
          />
          <button
            type="submit"
            disabled={isSending}
            className="py-2 text-white rounded-md ring-0 ring-purple-500/50 focus:ring-4 bg-purple-700 hover:bg-purple-600 transition flex gap-3 justify-center items-center disabled:opacity-50 w-full">
            ساخت ادرس{" "}
            <LuLoader2 className="text-xl animate-spin" hidden={!isSending} />
          </button>
        </Form>
      </Formik>
      <div className="shadow-inner border p-4 rounded-md flex flex-col gap-3 bg-zinc-100/50">
        <h2 className="text-center text-lg">ادرس ها</h2>
        {addresses &&
          addresses?.map((address) => (
            <div
              key={address.id}
              className="flex justify-between shadow rounded p-2 bg-white">
              <div className="break-words">
                {address.province},{address.city},پلاک{address.plaque},واحد{" "}
                {address.unit}, {address.description}, {address.postal_code}
              </div>
              <div className="flex gap-3 w-40 justify-end">
                <button className="grid place-items-center text-white bg-blue-500 rounded p-2 hover:bg-blue-400 transition hover:shadow ring-0 ring-blue-500/50 active:bg-blue-600 focus:ring-2 h-9">
                  <LuPenSquare />
                </button>
                <DeleteAddressButton
                  addressId={address.id!}
                  reFetch={reFetchAddress}
                  reFetchAddress={setReFetchAddress}
                />
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
