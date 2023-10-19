import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import React, { useState } from "react";
import ListUser from "../components/ListTugas";
import { FaUser, FaUserGraduate } from "react-icons/fa";
import TitleHead from "../components/TitleHead";

export default function User() {
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
          <section className="px-5">
            <TitleHead backto={"/dashboard/pengaturan"} label="Manage Users" />
          </section>
          <section className="px-5 pt-5">
            <ListUser
              icon={<FaUserGraduate />}
              label="Pengajar"
              date="User Role Pengajar"
              goto="/dashboard/pengaturan/user/pengajar"
            />
            <ListUser
              icon={<FaUser />}
              label="Siswa"
              date="User Role Siswa"
              goto="/dashboard/pengaturan/user/siswa"
            />
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}
