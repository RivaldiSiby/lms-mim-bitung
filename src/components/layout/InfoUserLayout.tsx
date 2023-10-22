import { generateUserData } from "@/helpers/generateUserData";
import React from "react";

export default function InfoUserLayout() {
  return (
    <section className="lg:hidden block mt-5">
      <p className="text-[14px]">Selamat Datang</p>
      <h4 className="text-[20px] font-bold">{generateUserData().nama}</h4>
    </section>
  );
}
