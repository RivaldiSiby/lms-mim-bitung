import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import React, { useState } from "react";
import ListUser from "./components/ListTugas";
import ItemInfo from "./components/ItemInfo";
import { FaUserFriends } from "react-icons/fa";

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
          <section className="px-5 pt-5">
            <ItemInfo
              icon={<FaUserFriends />}
              label="Manage User"
              goto={"/dashboard/pengaturan/user"}
            />
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Pengaturan.requireAuth = true;
