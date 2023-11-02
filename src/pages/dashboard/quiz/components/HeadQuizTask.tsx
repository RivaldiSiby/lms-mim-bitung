import { grayColor, primaryColor } from "@/helpers/color";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function HeaderQuizTask({ setAtive }: { setAtive: Function }) {
  const router = useRouter();
  const session: any = useSession();
  return (
    <header className="w-full min-h-[80px] py-5  bg-white shadow-sm flex justify-between lg:mt-5 items-center px-5">
      <section className="flex ">
        <button
          onClick={() => router.push("/dashboard/quiz")}
          className="md:text-[30px] text-[25px] border p-2 px-5 rounded-full border-[#7E72F4] "
          style={{ color: primaryColor }}
        >
          <MdKeyboardArrowLeft />
        </button>
        <section className="mx-5 ml-10 w-[300px] pt-1 lg:block hidden">
          <p className="text-[12px] font-medium">Nama :</p>
          <p className="text-[16px] font-bold">
            {session?.data?.user?.name?.nama}
          </p>
        </section>
        <section className="mx-5 w-[300px] pt-1 lg:block hidden">
          <p className="text-[12px] font-medium">Email :</p>
          <p className="text-[16px] font-bold">
            {session?.data?.user?.name?.email}
          </p>
        </section>
      </section>
      <button
        onClick={() => setAtive(true)}
        className="border shadow rounded-full px-10 py-2 text-center"
        style={{ color: grayColor }}
      >
        <p className="sm:text-[12px] text-[10px] font-medium">BUAT SOAL</p>
      </button>
    </header>
  );
}
