import { darkPrimaryColor, primaryColor } from "@/helpers/color";
import React from "react";
import InputForm from "../form/InputForm";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";

export default function ModalWrap({
  component,
  title,
  handler,
  close,
  show,
}: {
  component: React.ReactNode;
  title: string;
  handler: Function;
  close: Function;
  show: boolean;
}) {
  return (
    <main
      style={{ display: !show ? "none" : "flex" }}
      className="absolute font-[Montserrat] z-40 bg-black bg-opacity-50 w-full h-full items-center justify-center"
    >
      <section className="bg-white lg:w-[700px] sm:w-[80%] w-[90%]  p-5 flex items-center ">
        <section className="w-full">
          <section className="flex w-full justify-between mb-5">
            <h5
              className="font-bold font-montserrat lg:text-[20px]"
              style={{ color: darkPrimaryColor }}
            >
              {title}
            </h5>
            <button onClick={() => close()}>
              <AiOutlineClose />
            </button>
          </section>
          <section className="py-5">{component}</section>
          <button
            onClick={() => handler()}
            className="p-2 px-8 text-white rounded-xl float-right"
            style={{ background: primaryColor }}
          >
            Submit
          </button>
        </section>
      </section>
    </main>
  );
}
