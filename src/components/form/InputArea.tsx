import { grayColor } from "@/helpers/color";
import React from "react";

export default function InputArea({
  val,
  setVal,
  icon,
  isPassword,
  placeholder,
}: {
  val: string;
  setVal: Function;
  icon: any;
  isPassword: boolean;
  placeholder: string;
}) {
  return (
    <div
      className="w-full mb-5 md:h-[150px] h-[50px] font-[Montserrat] font-medium border flex pl-5 lg:text-[27px] text-[20px] rounded-xl bg-white"
      style={{ color: grayColor }}
    >
      <section className="w-[30px] flex justify-center  mr-5 text-[22px] my-3">
        {icon}
      </section>
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        style={{ height: "100%" }}
        className="flex-1  text-[14px] outline-none resize-none py-3"
      />
    </div>
  );
}
