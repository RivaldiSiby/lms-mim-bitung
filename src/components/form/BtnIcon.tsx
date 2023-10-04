import { darkPrimaryColor, grayColor, secondaryColor } from "@/helpers/color";
import React from "react";

export default function BtnIcon({
  label = "button",
  handler = false,
}: {
  label: any;
  handler: any;
}) {
  return (
    <button
      onClick={() => (!handler ? "" : handler())}
      className="lg:h-[53px] sm:h-[50px] h-[45px] text-[18px] font-[Montserrat] font-semibold px-4 rounded-full shadow cursor-pointer"
      style={{ background: secondaryColor, color: grayColor }}
    >
      {label}
    </button>
  );
}
