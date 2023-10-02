import { grayColor, lightColor, primaryColor } from "@/helpers/color";
import React from "react";
import { FaUser } from "react-icons/fa";

export default function ChatBox({
  name,
  msg,
  date,
}: {
  name: string;
  msg: string;
  date: string;
}) {
  return (
    <section className=" text-start mb-5">
      <section className="flex ">
        <section
          style={{ background: primaryColor }}
          className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]  rounded-full   items-center justify-center flex text-white"
        >
          <FaUser />
        </section>
        <section
          className="min-w-[200px] max-w-[50%] w-auto  ml-5 rounded-[20px] rounded-tl-[0px] min-h-[70px] p-2 shadow-sm "
          style={{ background: lightColor }}
        >
          <p className="md:text-[14px] text-[12px] font-bold">{name}</p>
          <p
            className="md:text-[14px] text-[12px] font font-medium py-2"
            style={{ color: grayColor }}
          >
            {msg}
          </p>
          <p
            className="md:text-[10px] text-[8px] font text-end"
            style={{ color: grayColor }}
          >
            {date}
          </p>
        </section>
      </section>
    </section>
  );
}
