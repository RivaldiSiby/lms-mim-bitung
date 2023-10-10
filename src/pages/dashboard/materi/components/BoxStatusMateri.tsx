import { primaryColor } from "@/helpers/color";
import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";

export default function BoxStatusMateri({ type }: { type: string }) {
  return (
    <button
      className="flex items-center p-3 sm:w-[150px]  text-white rounded-full"
      style={{ background: primaryColor }}
    >
      <span className="text-[25px] sm:mr-2">
        <MdOutlineFileDownload />
      </span>
      <p className="lg:text-[14px] text-[12px] sm:block hidden font-medium">
        {type}
      </p>
    </button>
  );
}
