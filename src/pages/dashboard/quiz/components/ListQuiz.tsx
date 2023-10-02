import { grayColor, primaryColor } from "@/helpers/color";
import React from "react";
import BoxStatus from "./BoxStatus";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function ListQuiz({
  label,
  data,
  status,
  date,
}: {
  label: string;
  data: any;
  status: number;
  date: string;
}) {
  return (
    <section className="w-full h-[70px] border flex items-center px-3 bg-white shadow mb-3">
      <BoxStatus status={status} />
      <section className="flex-1 mx-5 my-2 border-l-2 border-l-slate-800 px-5 flex flex-col justify-center">
        <p className="lg:text-[16px] text-[14px] font-bold">{label}</p>
        <p className="lg:text-[12px] text-[10px]" style={{ color: grayColor }}>
          {date}
        </p>
      </section>
      <button className="w-[10%] h-full items-center justify-end text-[40px] sm:flex hidden">
        <MdKeyboardArrowRight />
      </button>
    </section>
  );
}