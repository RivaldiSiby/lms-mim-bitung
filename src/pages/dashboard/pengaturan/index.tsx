import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import React, { useState } from "react";

export default function Pengaturan() {
  const [menuShow, setMenuShow] = useState(false);
  return (
    <AuthComponent>
      <LayoutDas
        menuShow={menuShow}
        setMenuShow={setMenuShow}
        active="Pengaturan"
      >
        <section className="w-full h-full ">
          <HeaderDas setMenuShow={setMenuShow} />
          <section className="px-5">
            <h1>Pengaturan</h1>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Pengaturan.requireAuth = true;
