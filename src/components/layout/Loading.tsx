import { primaryColor } from "@/helpers/color";
import React from "react";

export default function Loading() {
  return (
    <section className="border absolute z-50 w-full h-[100vh] flex items-center flex-col justify-center bg-[#F7F7F7]">
      <img className="w-[300px]" src="/img/loading.gif" alt="loadings" />
      <h5
        className="font-[Montserrat] font-medium "
        style={{ color: primaryColor }}
      >
        Mohon Tunggu
      </h5>
    </section>
  );
}
