import { grayColor, primaryColor } from "@/helpers/color";
import React from "react";

export default function InfoTask({
  msg,
  score = false,
}: {
  msg: string;
  score: any;
}) {
  return (
    <section className="bg-white  shadow rounded-lg min-h-[100px] items-center flex justify-center flex-col py-10 mb-5">
      <p
        className="text-center lg:w-[40%] px-5 md:text-[50px] text-[40px] font-bold"
        style={{ color: primaryColor }}
      >
        {score}
      </p>
      <p
        className="text-center  lg:w-[40%] px-5 text-[14px]"
        style={{ color: grayColor }}
      >
        {msg}
      </p>
    </section>
  );
}
