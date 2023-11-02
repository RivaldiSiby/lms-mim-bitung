import { grayColor, primaryColor } from "@/helpers/color";
import React from "react";

export default function ListPilihan({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <section className="flex  my-4 items-center">
      <section
        className="border lg:text-[18px] text-[16px] font-medium lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] rounded-xl mr-5 flex justify-center items-center"
        style={{
          borderColor: primaryColor,
          color: !active ? grayColor : "white",
          background: !active ? "white" : primaryColor,
        }}
      >
        {label}
      </section>
      <p className="lg:text-[14px] text-[12px] font-medium">{value}</p>
    </section>
  );
}
