import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import React, { useState } from "react";
import { FaUser, FaUserGraduate } from "react-icons/fa";
import TitleHead from "../../components/TitleHead";

export default function Pengajar() {
  const [menuShow, setMenuShow] = useState(false);
  return (
    <AuthComponent>
      <LayoutDas
        menuShow={menuShow}
        setMenuShow={setMenuShow}
        active="Pengaturan"
      >
        <section className="w-full h-full">
          <HeaderDas setMenuShow={setMenuShow} />
          <section className="px-5 pt-5">
            <TitleHead backto={false} label="Pengajar" />
            test
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}
