import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { primaryColor } from "@/helpers/color";
import React, { useState } from "react";
import ChatWriter from "./components/ChatWriter";
import ChatBox from "./components/ChatBox";
import ChatSend from "./components/ChatSend";
import InfoUserLayout from "@/components/layout/InfoUserLayout";

export default function Forum() {
  const [menuShow, setMenuShow] = useState(false);
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
                  Olivia Rahmi telah mengirim pesan forum . . . .
                </p>
              </section>
            </section>
            <section className="flex-1 lg:max-h-[650px] max-h-[500px] border rounded-xl bg-white shadow  flex flex-col">
              <section className=" p-5 lg:h-[635px] h-[435px] overflow-y-auto">
                <ChatBox
                  name="Ilham"
                  msg=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            id laborum, sint neque porro rerum voluptates similique voluptatum
            facere, sunt rem earum! Quasi, magni! Tenetur aperiam iure harum cum
            odio."
                  date="3 jam yang lalu"
                />
                <ChatSend
                  msg=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            id laborum, sint neque porro rerum voluptates similique voluptatum
            facere, sunt rem earum! Quasi, magni! Tenetur aperiam iure harum cum
            odio."
                  date="3 jam yang lalu"
                />
                <ChatBox
                  name="Ilham"
                  msg=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            id laborum, sint neque porro rerum voluptates similique voluptatum
            facere, sunt rem earum! Quasi, magni! Tenetur aperiam iure harum cum
            odio."
                  date="3 jam yang lalu"
                />
                <ChatSend
                  msg=" Lorem ipsum dolor sit, amet consectetur adipis"
                  date="3 jam yang lalu"
                />
                <ChatBox
                  name="Ilham"
                  msg=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            id laborum, sint neque porro rerum voluptates similique voluptatum
            facere, sunt rem earum! Quasi, magni! Tenetur aperiam iure harum cum
            odio."
                  date="3 jam yang lalu"
                />
                <ChatSend
                  msg=" Lorem ipsum dolor sit, amet consectetur adipis"
                  date="3 jam yang lalu"
                />
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
