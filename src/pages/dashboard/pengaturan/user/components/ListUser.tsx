import { darkPrimaryColor, grayColor, primaryColor } from "@/helpers/color";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function ListUser({ data }: { data: any }) {
  console.log(data);
  return (
    <section className="flex w-full border p-5 rounded-xl mb-5">
      <section
        style={{ background: primaryColor }}
        className="lg:w-[80px] lg:h-[80px] w-[50px] h-[50px]  text-white lgtext-[40px] text-[25px] border flex justify-center items-center rounded-full"
      >
        <AiOutlineUser />
      </section>
      <section className="flex flex-col justify-center pl-5">
        <p
          className="lg:text-[16px] text-[14px] font-bold"
          style={{ color: darkPrimaryColor }}
        >
          {data.nama}
        </p>
        <p style={{ color: grayColor }} className="lg:text-[14px] text-[12px] ">
          {data.email}
        </p>
      </section>
    </section>
  );
}
