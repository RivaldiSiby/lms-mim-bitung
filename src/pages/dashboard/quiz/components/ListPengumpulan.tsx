import { grayColor, primaryColor } from "@/helpers/color";
import Link from "next/link";
import React from "react";
import {
  MdAccessTimeFilled,
  MdFileDownload,
  MdFileDownloadDone,
} from "react-icons/md";

export default function ListPengumpulanQuiz({
  data,
  status,
}: {
  data: any;
  status: any;
}) {
  return (
    <section className="flex-1 border flex flex-row items-center px-2 bg-white shadow mb-3 py-2 rounded-[20px]">
      <section
        className="w-[50px] flex h-[50px] items-center justify-center rounded-full bg-opacity-70"
        style={{
          background: status === 1 ? grayColor : status === 2 ? "red" : "green",
        }}
      >
        <span className="text-[25px] text-white">
          {status === 1 ? <MdAccessTimeFilled /> : <MdFileDownloadDone />}
        </span>
      </section>
      <p className="flex-1 ml-5">{data?.user?.name?.nama}</p>
      {status === 1 ? (
        <section
          className=" px-3 flex h-[50px]  items-center justify-center rounded-full"
          style={{ background: status === 1 ? grayColor : primaryColor }}
        >
          <p className="text-white ">{data?.score}</p>
        </section>
      ) : (
        <section
          className="px-3 flex h-[50px]  items-center justify-center rounded-full"
          style={{ background: status === 1 ? grayColor : primaryColor }}
        >
          <p className="text-white ">{data?.score}</p>
        </section>
      )}
    </section>
  );
}
