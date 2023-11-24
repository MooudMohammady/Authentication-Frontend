import Link from "next/link";

export default function Home() {
  //TODO ندل کردن بخش وارد یا وارد نبودن کاربر با توکن
  return (
    <main className="h-screen grid place-items-center">
      <div className="flex flex-col gap-3">
        <Link href={"/auth"}>احراز هویت کلیک کنید</Link>
        <Link href={"/admin"}>داشبورد کلیک کنید</Link>
      </div>
    </main>
  );
}
