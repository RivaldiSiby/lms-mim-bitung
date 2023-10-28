import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { primaryColor } from "@/helpers/color";
import React, { useEffect, useRef, useState } from "react";
import ChatWriter from "./components/ChatWriter";
import ChatBox from "./components/ChatBox";
import ChatSend from "./components/ChatSend";
import InfoUserLayout from "@/components/layout/InfoUserLayout";
import { limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { chatCollection } from "@/firebase/firestore/chat";
import { useSession } from "next-auth/react";
import { formatDuration } from "@/helpers/generateTime";

export default function Forum() {
  const [menuShow, setMenuShow] = useState(false);
  const [data, setData] = useState<any>([]);
  const dataAuth: any = useSession();

  const messagesEndRef: any = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const q = query(chatCollection, orderBy("created_at", "asc"), limit(50));
    const snapshot = onSnapshot(q, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setData(wrapdata);
    });
    return () => snapshot();
  }, []);
  console.log(data);

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <AuthComponent>
      <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Forum">
        <section className="w-full h-full flex flex-col">
          <HeaderDas setMenuShow={setMenuShow} />
          <section className="px-5 flex-1 flex flex-col pb-5">
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
                  {data.length > 0
                    ? `${
                        data[data.length - 1]?.user_payload?.nama
                      } telah mengirim pesan forum . . . .`
                    : ""}
                </p>
              </section>
            </section>
            <section className="flex-1 lg:max-h-[650px] max-h-[500px] border rounded-xl bg-white shadow  flex flex-col">
              <section className=" p-5 lg:h-[635px] h-[435px] overflow-y-auto">
                {data.length > 0
                  ? data.map((v: any) =>
                      v?.created_by === dataAuth?.data?.user?.name?.id ? (
                        <>
                          <ChatSend
                            msg={v?.text}
                            date={formatDuration(v?.created_at)}
                          />
                        </>
                      ) : (
                        <>
                          <ChatBox
                            name={v?.user_payload?.nama}
                            msg={v?.text}
                            date={formatDuration(v?.created_at)}
                          />
                        </>
                      )
                    )
                  : ""}
                <div ref={messagesEndRef} />
              </section>
              <ChatWriter />
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Forum.requireAuth = true;
