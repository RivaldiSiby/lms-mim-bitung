import { grayColor } from "@/helpers/color";
import React from "react";

export default function InputFile({
  setVal,
  icon,
  placeholder,
}: {
  setVal: Function;
  icon: any;
  placeholder: string;
}) {
  return (
    <div
      className="w-full mb-5 md:h-[55px] h-[50px] font-[Montserrat] font-medium border flex items-center px-5 lg:text-[27px] text-[20px] rounded-xl bg-white"
      style={{ color: grayColor }}
    >
      <section className="w-[30px] flex justify-center  mr-5 text-[22px]">
        {icon}
      </section>
      <input
        onChange={(e: any) => setVal(e.target.files[0])}
        placeholder={placeholder}
        className="flex-1 text-[14px] outline-none"
        type="file"
      />
    </div>
  );
}
