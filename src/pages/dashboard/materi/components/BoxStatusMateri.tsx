import { primaryColor } from "@/helpers/color";
import Link from "next/link";
import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";

export default function BoxStatusMateri({ link }: { link: string }) {
  return (
    <Link
      href={link}
      download={link}
      className="flex items-center py-3 justify-center sm:w-[150px]  text-white rounded-full"
      style={{ background: primaryColor }}
    >
      <span className="text-[25px] sm:mr-2">
        <MdOutlineFileDownload />
      </span>
      <p className="lg:text-[14px] text-[12px] sm:block hidden font-medium">
        Download
      </p>
    </Link>
  );
}
