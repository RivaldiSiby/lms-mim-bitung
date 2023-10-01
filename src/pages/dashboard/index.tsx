import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { primaryColor } from "@/helpers/color";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ItemInfo from "./components/ItemInfo";
import { FaUserFriends } from "react-icons/fa";
import { MdQuiz, MdMenuBook } from "react-icons/md";

export default function Dashboard() {
  const [menuShow, setMenuShow] = useState(false);
  return (
    <AuthComponent>
      <LayoutDas
        menuShow={menuShow}
        setMenuShow={setMenuShow}
        active="Dashboard"
      >
        <section className="w-full h-full ">
          <HeaderDas setMenuShow={setMenuShow} />
          <section className="px-5">
            <section className="lg:hidden block mt-5">
              <p className="text-[14px]">Selamat Datang</p>
              <h4 className="text-[20px] font-bold">Olivia Rahmi</h4>
            </section>
            <section
              style={{ background: primaryColor }}
              className="w-full h-[150px] border rounded-xl flex items-center mt-5 mb-10"
            >
              <img
                className="lg:w-[50%] w-[40%] absolute"
                src="/img/activity.svg"
                alt="activity"
              />
              <section className="flex-1 text-white text-end flex flex-col justify-between h-full p-5">
                <p className="text-[16px] font-bold">Aktifitas Forum</p>
                <p className="lg:text-[16px] sm:text-[14px] text-[12px] font-medium">
                  Olivia Rahmi telah mengirim pesan forum . . . .
                </p>
              </section>
            </section>
            <section className="flex flex-wrap justify-between">
              <ItemInfo icon={<FaUserFriends />} label="User" count="15" />
              <ItemInfo icon={<MdQuiz />} label="Quiz" count="30" />
              <ItemInfo icon={<MdMenuBook />} label="Materi" count="15" />
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Dashboard.requireAuth = true;
