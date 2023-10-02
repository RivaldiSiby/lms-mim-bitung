import { primaryColor } from "@/helpers/color";
import Link from "next/link";
import React from "react";

export default function MenuList({
  active,
  goto,
  label,
  icon,
}: {
  active: boolean;
  goto: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <section
      style={{ background: active ? "white" : primaryColor }}
      className="w-full h-[56px] rounded-xl items-center mb-2"
    >
      <Link
        className=" items-center flex ml-[20%] h-full font-semibold md:text-[14px] text-[12px]"
        style={{ color: active ? primaryColor : "white" }}
        spellCheck
        href={goto}
      >
        <span className="md:text-[20px] text-[16px] mr-3">{icon}</span>
        {label}
      </Link>
    </section>
  );
}
