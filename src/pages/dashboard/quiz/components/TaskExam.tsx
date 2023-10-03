import { grayColor, primaryColor } from "@/helpers/color";
import React from "react";
import ListPilihan from "./ListPilihan";

export default function TaskExam({ soal, no }: { soal: string; no: string }) {
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
      <section>
        <ListPilihan label="A" value="Komposisi benda berubah." />
        <ListPilihan label="B" value="Benda berubah menjadi zat lain." />
        <ListPilihan label="C" value="Hanya bentuk benda yang berubah." />
        <ListPilihan label="D" value="Benda mengalami perubahan kimia." />
      </section>
    </section>
  );
}
