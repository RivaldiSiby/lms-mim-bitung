import BtnSection from "@/components/form/BtnSection";
import InputBox from "@/components/form/InputBox";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor, primaryColor } from "@/helpers/color";
import React, { useState } from "react";
import { MdQuiz, MdKey } from "react-icons/md";
import ListQuiz from "./components/ListQuiz";

export default function Quiz() {
  const [menuShow, setMenuShow] = useState(false);
  const [code, setCode] = useState("");
  return (
    <AuthComponent>
      <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Quiz">
        <section className="w-full h-full ">
          <HeaderDas setMenuShow={setMenuShow} />
          <section className="px-5 ">
            <section className="lg:hidden block mt-5">
              <p className="text-[14px]">Selamat Datang</p>
              <h4 className="text-[20px] font-bold">Olivia Rahmi</h4>
            </section>
            <section
              style={{ background: primaryColor }}
              className="w-full flex-col lg:flex-row h-[150px] border rounded-xl flex lg:items-center justify-between mt-5 mb-10 lg:px-10 px-5"
            >
              <section className="text-[100px] text-white opacity-40 lg:block hidden">
                <MdQuiz />
              </section>
              <section className="lg:w-[50%] flex-1 flex items-center  mb-[-1.25rem] lg:mx-5">
                <InputBox
                  isPassword
                  val={code}
                  setVal={setCode}
                  placeholder="KODE QUIZ"
                  icon={<MdKey />}
                />
              </section>
              <section className="lg:mb-0 mb-3">
                <BtnSection
                  handler={() => console.log("gabung")}
                  label="Gabung Quiz"
                />
              </section>
            </section>
            <p
              className="font-semibold mb-5 text-[16px]"
              style={{ color: grayColor }}
            >
              Quiz Yang diikuti
            </p>
            <section className="pb-5">
              <ListQuiz
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={3}
                label="Ujian Bahasa Indo Quiz"
              />
              <ListQuiz
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={2}
                label="Ujian Bahasa Indo Quiz"
              />
              <ListQuiz
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={1}
                label="Ujian Bahasa Indo Quiz"
              />
              <ListQuiz
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={3}
                label="Ujian Bahasa Indo Quiz"
              />
              <ListQuiz
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={2}
                label="Ujian Bahasa Indo Quiz"
              />
              <ListQuiz
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={1}
                label="Ujian Bahasa Indo Quiz"
              />
              <ListQuiz
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={3}
                label="Ujian Bahasa Indo Quiz"
              />
              <ListQuiz
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={2}
                label="Ujian Bahasa Indo Quiz"
              />
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Quiz.requireAuth = true;
