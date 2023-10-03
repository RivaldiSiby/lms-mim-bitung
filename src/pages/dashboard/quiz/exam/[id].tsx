import BtnSection from "@/components/form/BtnSection";
import InputBox from "@/components/form/InputBox";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor, primaryColor } from "@/helpers/color";
import React, { useState } from "react";
import { MdQuiz, MdKey } from "react-icons/md";
import HeaderQuiz from "../components/HeaderQuiz";
import InfoTask from "../components/InfoTask";
import TaskExam from "../components/TaskExam";

export default function Exam() {
  const [menuShow, setMenuShow] = useState(false);
  const [code, setCode] = useState("");
  return (
    <AuthComponent>
      <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Quiz">
        <section className="w-full h-full pb-5 flex flex-col">
          <HeaderQuiz />
          <section className="p-5 flex-1 ">
            <section className=" pt-5 flex flex-col lg:flex-row w-full justify-between lg:items-center mb-10">
              <h5
                className="lg:text-[18px] text-[16px] font-semibold"
                style={{ color: primaryColor }}
              >
                Ujian Matematika Quiz ( 30 Soal - Durasi 60 Menit )
              </h5>
              <p
                className="lg:text-[14px] text-[12px] font-medium pt-2 lg:pt-0"
                style={{ color: grayColor }}
              >
                4 Oktober 2023
              </p>
            </section>

            {/* info task quiz belum di mulai */}
            {/* <InfoTask
              score={false}
              msg="Quiz Belum dimulai , Silahkan menghubungi pengajar untuk informasi lebih lanjut . . ."
            /> */}

            {/* info task quiz sudah selesai */}
            {/* <InfoTask
              score={96}
              msg="Quiz Telah selesai , silahkan tunggu untuk peroleh nilai hasil quiz"
            /> */}

            {/* task quiz info */}
            <TaskExam
              no="1"
              soal=" Sebuah benda mengalami perubahan bentuk ketika diberikan gaya tekanan.
          Hal ini merupakan contoh dari perubahan fisik karena :"
            />
            <TaskExam
              no="2"
              soal=" Sebuah benda mengalami perubahan bentuk ketika diberikan gaya tekanan.
          Hal ini merupakan contoh dari perubahan fisik karena :"
            />
            <TaskExam
              no="3"
              soal=" Sebuah benda mengalami perubahan bentuk ketika diberikan gaya tekanan.
          Hal ini merupakan contoh dari perubahan fisik karena :"
            />

            <section className="text-end py-5">
              <BtnSection label="SUBMIT" handler={() => "Submit"} />
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Exam.requireAuth = true;
