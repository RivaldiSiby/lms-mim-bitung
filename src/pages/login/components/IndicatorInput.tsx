import { darkPrimaryColor, secondaryColor } from "@/helpers/color";
import React from "react";

export default function IndicatorInput({
  input1 = false,
  input2 = false,
}: {
  input1: boolean;
  input2: boolean;
}) {
  return (
    <div className="w-full  h-[15px] flex justify-between mt-10 mb-5">
      <section
        className=" w-[45%] rounded-full duration-200"
        style={{ background: !input1 ? darkPrimaryColor : secondaryColor }}
      ></section>
      <section
        className=" w-[45%] rounded-full duration-200"
        style={{ background: !input2 ? darkPrimaryColor : secondaryColor }}
      ></section>
    </div>
  );
}
