import { primaryColor } from "@/helpers/color";
import React from "react";

export default function ItemInfo({
  count,
  label,
  icon,
}: {
  count: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <section
      style={{ background: primaryColor }}
      className="sm:w-[31.5%] w-full shadow-sm h-[150px] border rounded-xl flex justify-between items-center  p-5 mb-5"
    >
      <section className="lg:text-[120px] text-[80px] text-white opacity-30">
        {icon}
      </section>
      <section className="flex-col flex justify-between h-full text-end text-white">
        <p className="text-[16px] font-medium">{label}</p>
        <p className="lg:text-[30px] text-[25px] font-bold">{count}</p>
      </section>
    </section>
  );
}
