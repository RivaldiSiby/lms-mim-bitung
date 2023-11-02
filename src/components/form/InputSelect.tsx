import { grayColor } from "@/helpers/color";
import React from "react";

export default function InputSelect({
  val,
  setVal,
  icon,
  isPassword,
  placeholder,
  option,
}: {
  val: string;
  setVal: Function;
  icon: any;
  isPassword: boolean;
  placeholder: string;
  option: any;
}) {
  return (
    <div
      className="w-full mb-5 md:h-[55px] h-[50px] font-[Montserrat] font-medium border flex items-center px-5 lg:text-[27px] text-[20px] rounded-xl bg-white"
      style={{ color: grayColor }}
    >
      <section className="w-[30px] flex justify-center  mr-5 text-[22px]">
        {icon}
      </section>
      <select
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-[14px] outline-none"
      >
        <option value={""} selected>
          {placeholder}
        </option>
        {option}
      </select>
      {/* <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-[14px] outline-none"
        type={isPassword ? "password" : "text"}
      /> */}
    </div>
  );
}
