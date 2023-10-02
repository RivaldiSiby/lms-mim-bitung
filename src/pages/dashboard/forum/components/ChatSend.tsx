import { grayColor, lightColor, primaryColor } from "@/helpers/color";
import React from "react";
import { FaUser } from "react-icons/fa";

export default function ChatSend({ msg, date }: { msg: string; date: string }) {
  return (
    <section className=" text-start mb-5  ">
      <section className="flex   justify-end">
        <section
          className="min-w-[200px] max-w-[50%] w-auto text-white  ml-5 rounded-[20px] rounded-tr-[0px] min-h-[70px] p-2 shadow-sm "
          style={{ background: primaryColor }}
        >
          <p className="md:text-[14px] text-[12px] font font-medium py-2">
            {msg}
          </p>
          <p className="md:text-[10px] text-[8px] font text-start opacity-70">
            {date}
          </p>
        </section>
      </section>
    </section>
  );
}
