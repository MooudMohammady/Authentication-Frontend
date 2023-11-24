"use client";
import { IAddress } from "@/Types";
import AdminContext from "@/contexts/AdminContext";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { LuLoader2, LuPenSquare } from "react-icons/lu";

//@ts-ignore
const DescriptionInput = ({ field, form, ...props }) => {
  return <textarea {...field} {...props} />;
};

export default function EditAddressButton({
  address,
  reFetchAddress,
  setReFetchAddress,
}: {
  address: IAddress;
  reFetchAddress: boolean;
  setReFetchAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { userId } = useContext(AdminContext);

  function closeModal() {
    if (!isEditing) setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="grid place-items-center text-white bg-blue-500 rounded p-2 hover:bg-blue-400 transition hover:shadow ring-0 ring-blue-500/50 active:bg-blue-600 focus:ring-2 h-9">
        <LuPenSquare />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    ویرایش ادرس
                  </Dialog.Title>
                  <Formik
                    initialValues={{
                      city: address.city ? address.city : "",
                      province: address.province ? address.province : "",
                      plaque: address.plaque ? address.plaque : "",
                      unit: address.unit ? address.unit : "",
                      description: address.description
                        ? address.description
                        : "",
                      postal_code: address.postal_code
                        ? address.postal_code
                        : "",
                    }}
                    onSubmit={async (value) => {
                      setIsEditing(true);
                      await axios
                        .put(`/api/address/${address.id}`, {
                          user: userId,
                          ...value,
                        })
                        .then(() => {
                          setReFetchAddress(!reFetchAddress);
                          setTimeout(() => {
                            closeModal();
                            setIsEditing(false);
                          }, 1000);
                        })
                        .catch((err) => {
                          console.log(err);
                          setIsEditing(false);
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
                        disabled={isEditing}
                        className="py-2 text-white rounded-md ring-0 ring-purple-500/50 focus:ring-4 bg-purple-700 hover:bg-purple-600 transition flex gap-3 justify-center items-center disabled:opacity-50 w-full">
                        ویرایش ادرس{" "}
                        <LuLoader2
                          className="text-xl animate-spin"
                          hidden={!isEditing}
                        />
                      </button>
                    </Form>
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
