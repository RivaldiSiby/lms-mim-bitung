import { primaryColor } from "@/helpers/color";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function ItemInfo({
  label,
  icon,
  goto,
}: {
  label: string | any;
  icon: React.ReactNode;
  goto: string | any;
}) {
  return (
    <Link
      href={goto}
      style={{ background: primaryColor }}
      className="sm:w-[31.5%] w-full shadow-sm h-[150px] border rounded-xl flex justify-between items-center  p-5 mb-5"
    >
      <section className="lg:text-[120px] text-[80px] text-white opacity-30">
        {icon}
      </section>
      <section className="flex-col flex justify-between h-full text-end text-white">
        <p className="text-[16px] font-medium">{label}</p>
        <p className="text-[25px] flex justify-end w-full ">
          <AiOutlineArrowRight />
        </p>
      </section>
    </Link>
  );
}
