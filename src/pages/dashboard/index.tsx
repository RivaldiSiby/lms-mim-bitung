import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { primaryColor } from "@/helpers/color";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ItemInfo from "./components/ItemInfo";
import { FaUserFriends } from "react-icons/fa";
import { MdQuiz, MdMenuBook } from "react-icons/md";
import InfoUserLayout from "@/components/layout/InfoUserLayout";
import { limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { chatCollection } from "@/firebase/firestore/chat";
import { materiCollection } from "@/firebase/firestore/materi";
import { userCollection } from "@/firebase/firestore/user";

export default function Dashboard() {
  const [menuShow, setMenuShow] = useState(false);
  const [dataChat, setDataChat] = useState<any>([]);
  const [dataMateri, setDataMateri] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    const q = query(chatCollection, orderBy("created_at", "asc"), limit(1));
    const snapshot = onSnapshot(q, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setDataChat(wrapdata);
    });
    return () => snapshot();
  }, []);

  useEffect(() => {
    const q = query(materiCollection, orderBy("created_at", "desc"));
    const snapshot = onSnapshot(q, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setDataMateri(wrapdata);
    });
    return () => snapshot();
  }, []);

  useEffect(() => {
    const q = query(userCollection, orderBy("created_at", "desc"));
    const snapshot = onSnapshot(q, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setDataUser(wrapdata);
    });
    return () => snapshot();
  }, []);
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
            <InfoUserLayout />
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
                  {dataChat.length > 0
                    ? `${
                        dataChat[dataChat.length - 1]?.user_payload?.nama
                      } telah mengirim pesan forum . . . .`
                    : ""}
                </p>
              </section>
            </section>
            <section className="flex flex-wrap justify-between">
              <ItemInfo
                icon={<FaUserFriends />}
                label="User"
                count={`${dataUser?.length}`}
              />
              <ItemInfo icon={<MdQuiz />} label="Quiz" count="30" />
              <ItemInfo
                icon={<MdMenuBook />}
                label="Materi"
                count={`${dataMateri?.length}`}
              />
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Dashboard.requireAuth = true;
