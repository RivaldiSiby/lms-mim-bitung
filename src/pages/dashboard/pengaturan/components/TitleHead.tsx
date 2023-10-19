import { grayColor, primaryColor } from "@/helpers/color";
import { useRouter } from "next/router";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function TitleHead({
  label,
  backto = false,
}: {
  label: string;
  backto: any;
}) {
  const router = useRouter();
  return (
    <section className="flex justify-between my-5 items-center ">
      <p className="font-semibold  text-[16px]" style={{ color: grayColor }}>
        {label}
      </p>
      <button
        onClick={() => (!backto ? router.back() : router.push(backto))}
        className="md:text-[30px] text-[25px] border p-2 px-5 rounded-full border-[#7E72F4] "
        style={{ color: primaryColor }}
      >
        <MdKeyboardArrowLeft />
      </button>
    </section>
  );
}
