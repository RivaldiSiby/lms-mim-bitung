import { darkPrimaryColor, grayColor, secondaryColor } from "@/helpers/color";
import React from "react";

export default function BtnSection({
  label = "button",
  handler = false,
}: {
  label: string;
  handler: any;
}) {
  return (
    <button
      onClick={() => (!handler ? "" : handler())}
      className="lg:h-[53px] h-[50px] font-[Montserrat] font-semibold lg:w-[200px] w-[170px] rounded-full shadow cursor-pointer"
      style={{ background: secondaryColor, color: grayColor }}
    >
      {label}
    </button>
  );
}
