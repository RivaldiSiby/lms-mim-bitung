import { primaryColor } from "@/helpers/color";
import React from "react";
import {
  MdFileDownloadDone,
  MdAccessTimeFilled,
  MdAutorenew,
} from "react-icons/md";

export default function BoxStatus({ status }: { status: number }) {
  return (
    <section
      className="flex items-center p-3 sm:w-[150px]  text-white rounded-full"
      style={{ background: primaryColor }}
    >
      {status === 3 ? (
        <>
          <span className="text-[25px] sm:mr-2">
            <MdFileDownloadDone />
          </span>
          <p className="lg:text-[14px] text-[12px] sm:block hidden font-medium">
            Selesai
          </p>
        </>
      ) : (
        ""
      )}
      {status === 2 ? (
        <>
          <span className="text-[25px] sm:mr-2">
            <MdAutorenew />
          </span>
          <p className="lg:text-[14px] text-[12px] sm:block hidden font-medium">
            Berlangsung
          </p>
        </>
      ) : (
        ""
      )}
      {status === 1 ? (
        <>
          <span className="text-[25px] sm:mr-2">
            <MdAccessTimeFilled />
          </span>
          <p className="lg:text-[14px] text-[12px] sm:block hidden font-medium">
            Menunggu
          </p>
        </>
      ) : (
        ""
      )}
    </section>
  );
}
