import Link from "next/link";

export default function Home() {
  //TODO ندل کردن بخش وارد یا وارد نبودن کاربر با توکن
  return (
    <main className="h-screen grid place-items-center">
      <Link href={"/auth"}>احراز هویت کلیک کنید</Link>
    </main>
  );
}
