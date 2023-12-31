import { darkPrimaryColor, grayColor, secondaryColor } from "@/helpers/color";
import React from "react";

export default function BtnSection({
  label = "button",
  handler = false,
}: {
  label: any;
  handler: any;
}) {
  return (
    <button
      onClick={() => (!handler ? "" : handler())}
      className="lg:h-[53px] sm:h-[50px] h-[45px] lg:text-[16px] sm:text-[14px] text-[12px] font-[Montserrat] font-semibold lg:w-[200px] w-[170px] rounded-full shadow cursor-pointer"
      style={{ background: secondaryColor, color: grayColor }}
    >
      {label}
    </button>
  );
}
