import { primaryColor } from "@/helpers/color";
import React from "react";

export default function LoadingTransparant() {
  return (
    <section className=" absolute z-50 w-full h-[100vh] flex items-center flex-col justify-center bg-black bg-opacity-40">
      <img
        className="w-[300px] rounded-full"
        src="/img/loading.gif"
        alt="loadings"
      />
      <h5
        className="font-[Montserrat] font-medium mt-[-50px]"
        style={{ color: primaryColor }}
      >
        Mohon Tunggu
      </h5>
    </section>
  );
}
