import { grayColor, lightColor, primaryColor } from "@/helpers/color";
import React from "react";
import { IoIosSend } from "react-icons/io";

export default function ChatWriter() {
  return (
    <section className="w-full h-[65px]  flex px-3  items-center mb-3">
      <section
        className="flex-1 border shadow-sm md:mr-5 mr-3 m-[7.5px] h-[55px] rounded-full flex items-center px-5 text-[14px] font-medium"
        style={{ background: lightColor }}
      >
        <input
          style={{ background: lightColor }}
          className=" outline-none flex-1 md:text-[14px] text-[12px]"
          type="text"
          name=""
          id=""
          placeholder="Masukan Pesan disini . . ."
        />
      </section>
      <button
        className="h-[55px] w-[55px] text-white rounded-full shadow flex items-center justify-center text-[35px]"
        style={{ background: primaryColor }}
      >
        <IoIosSend />
      </button>
    </section>
  );
}
