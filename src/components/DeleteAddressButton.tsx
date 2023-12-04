"use client";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { LuLoader2, LuTrash } from "react-icons/lu";
import { toast } from "react-toastify";

export default function DeleteAddressButton({
  addressId,
  reFetchAddress,
  setReFetchAddress,
}: {
  addressId: string;
  reFetchAddress: boolean;
  setReFetchAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function closeModal() {
    if (!isDeleting) setIsOpen(false);
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
        className="grid place-items-center text-white bg-red-500 rounded p-2 hover:bg-red-400 transition hover:shadow ring-0 ring-red-500/50 active:bg-red-600 focus:ring-2 h-9">
        <LuTrash />
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
                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    ایا شما این ادرس را پاک میکنید؟
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      وقتی این ادرس را پاک کنید دیگر قابلیت بازگرداندن ان را
                      ندارید !
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50"
                      disabled={isDeleting}
                      onClick={async () => {
                        setIsDeleting(true);
                        await toast
                          .promise(axios.delete(`/api/address/${addressId}`), {
                            pending: "درحال حذف ادرس مورد نظر",
                            error: "حذف نشد!",
                            success: "ادرس با موفقیت حذف شد!",
                          })
                          .then(() => {
                            setReFetchAddress(!reFetchAddress);
                            setTimeout(() => {
                              closeModal();
                              setIsDeleting(false);
                            }, 500);
                          })
                          .catch((err) => {
                            console.log(err);
                            setIsDeleting(true);
                          });
                      }}>
                      بله پاک شود{" "}
                      <LuLoader2
                        className="text-xl animate-spin"
                        hidden={!isDeleting}
                      />
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
                      onClick={closeModal}>
                      لغو
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
