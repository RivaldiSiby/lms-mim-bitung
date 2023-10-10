import { grayColor, primaryColor } from "@/helpers/color";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import BoxStatusMateri from "./BoxStatusMateri";

export default function ListMateri({
  label,
  data,
  type,
  desc,
  id,
}: {
  label: string;
  data: any;
  type: string;
  desc: string;
  id: string;
}) {
  return (
    <section className="w-full h-[70px] border flex items-center px-3 bg-white shadow mb-3">
      <BoxStatusMateri type={type} />
      <section className="flex-1 mx-5 my-2 border-l-2 px-5 flex flex-col justify-center">
        <p className="lg:text-[16px] text-[14px] font-bold">{label}</p>
        <p
          className="lg:text-[12px] text-[10px] flex"
          style={{ color: grayColor }}
        >
          {desc}
        </p>
      </section>
    </section>
  );
}
