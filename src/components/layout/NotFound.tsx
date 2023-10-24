import { primaryColor } from "@/helpers/color";
import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import BtnSection from "../form/BtnSection";
import { useRouter } from "next/router";

export default function NotFound({
  text,
  goto,
}: {
  text: string;
  goto: string;
}) {
  const router = useRouter();
  return (
    <section className="border z-50 lg:w-[75%] w-full fixed h-[100vh] flex items-center flex-col justify-center bg-[#F7F7F7]">
      <section className="text-[100px]" style={{ color: primaryColor }}>
        <AiOutlineFileSearch />
      </section>
      <h5
        className="font-[Montserrat] font-medium mt-5 mb-5"
        style={{ color: primaryColor }}
      >
        {text}
      </h5>
      <BtnSection label={"Kembali"} handler={() => router.replace(goto)} />
    </section>
  );
}
