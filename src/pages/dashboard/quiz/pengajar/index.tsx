import BtnSection from "@/components/form/BtnSection";
import InputBox from "@/components/form/InputBox";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor, primaryColor } from "@/helpers/color";
import React, { useEffect, useRef, useState } from "react";
import { MdQuiz, MdKey } from "react-icons/md";
import ListQuiz from "../components/ListQuiz";
import { FaPlus } from "react-icons/fa";
import BtnIcon from "@/components/form/BtnIcon";

export default function Quiz() {
  const [menuShow, setMenuShow] = useState(false);
  const [code, setCode] = useState("");
  const [screen, setScreen] = useState<any>(false);
  useEffect(() => {
    if (window) {
      setScreen({ w: window.innerWidth, h: window.innerHeight });
    }
  }, []);

  return (
    <AuthComponent>
      <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Quiz">
        <section className="w-full h-full ">
          <HeaderDas setMenuShow={setMenuShow} />
          <section className="px-5 ">
            <section className="flex justify-between my-5 items-center mt-10">
              <p
                className="font-semibold  text-[16px]"
                style={{ color: grayColor }}
              >
                Quiz Yang diikuti
              </p>
              {screen?.w > 768 ? (
                <BtnSection
                  handler={() => console.log("gabung")}
                  label={"Buat Quiz"}
                />
              ) : (
                <BtnIcon
                  handler={() => console.log("gabung")}
                  label={<FaPlus />}
                />
              )}
            </section>
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
