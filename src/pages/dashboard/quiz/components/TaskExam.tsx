import { grayColor, primaryColor } from "@/helpers/color";
import React from "react";
import ListPilihan from "./ListPilihan";

export default function TaskExam({
  soal,
  no,
  option,
}: {
  soal: string;
  no: string;
  option: any;
}) {
  return (
    <section className="bg-white  shadow rounded-lg min-h-[100px] mb-5 items-center  p-5">
      <section className="flex ">
        <p
          className="md:text-[16px] text-[12px] w-[40px] font-semibold "
          style={{ color: grayColor }}
        >
          {no}.
        </p>
        <p
          className="md:text-[16px] text-[12px] font-semibold"
          style={{ color: grayColor }}
        >
          {soal}
        </p>
      </section>
      <section>{option}</section>
    </section>
  );
}
