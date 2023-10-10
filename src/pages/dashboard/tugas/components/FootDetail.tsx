import { primaryColor } from "@/helpers/color";
import React from "react";
import { AiFillCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";

export default function FootDetail() {
  return (
    <section className="flex sm:flex-row flex-col">
      <section className="sm:w-[40%] w-full mr-5 min-h-[70px] border flex flex-col justify-center items-center px-3 bg-white shadow mb-3  p-3">
        <h5 className="lg:text-[50px] text-[30px] text-gray-500 text-opacity-30 font-bold">
          Z3SFAA12
        </h5>
        <p className="lg:text-[14px] text-[12px]">Kode Tugas</p>
      </section>
      <section className="flex-1 min-h-[70px] border flex sm:flex-row flex-col-reverse items-center px-3 bg-white shadow mb-3 py-3">
        <section className="flex sm:flex-col flex-row">
          <section className="flex items-center my-2">
            <span className="text-[20px]" style={{ color: primaryColor }}>
              <AiFillCheckCircle />
            </span>
            <p className="px-3 lg:text-[14px] text-[12px]">JPG / PNG</p>
          </section>
          <section className="flex items-center my-2">
            <span className="text-[20px]" style={{ color: primaryColor }}>
              <AiFillCheckCircle />
            </span>
            <p className="px-3 lg:text-[14px] text-[12px]">WORD / PPT</p>
          </section>
          <section className="flex items-center my-2">
            <span className="text-[20px]" style={{ color: primaryColor }}>
              <AiFillCheckCircle />
            </span>
            <p className="px-3 lg:text-[14px] text-[12px]">PDF</p>
          </section>
        </section>
        <section className="flex-1 h-full py-3 w-full ">
          <button
            className="sm:h-full h-[60px] w-full rounded-xl flex items-center justify-center text-white lg:text-[16px] text-[14px]"
            style={{ background: primaryColor }}
          >
            <span className="text-[30px] pr-5" style={{ color: "white" }}>
              <AiOutlineCloudUpload />
            </span>
            UPLOAD TUGAS
          </button>
        </section>
      </section>
    </section>
  );
}
