import { grayColor, primaryColor } from "@/helpers/color";
import React, { ReactComponentElement } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import BoxStatus from "@/components/layout/BoxStatus";

export default function ListUser({
  label,
  icon,
  date,
  goto,
}: {
  label: string;
  icon: any;
  date: string;
  goto: string;
}) {
  return (
    <Link
      href={goto ?? ""}
      className="w-full h-[70px] border flex items-center px-3 bg-white shadow mb-3"
    >
      <section
        className="text-[30px] flex items-center justify-center rounded-full  w-[50px] h-[50px] text-white"
        style={{ background: primaryColor }}
      >
        {icon}
      </section>
      <section className="flex-1 mx-5 my-2 border-l-2 px-5 flex flex-col justify-center">
        <p className="lg:text-[16px] text-[14px] font-bold">{label}</p>
        <p
          className="lg:text-[12px] text-[10px] flex"
          style={{ color: grayColor }}
        >
          {" "}
          {date}
        </p>
      </section>
      <button
        style={{ color: grayColor }}
        className="w-[10%] h-full items-center justify-end text-[40px] sm:flex hidden"
      >
        <MdKeyboardArrowRight />
      </button>
    </Link>
  );
}
