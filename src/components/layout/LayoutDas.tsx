import { lightColor, primaryColor } from "@/helpers/color";
import React, { useState } from "react";
import MenuList from "./MenuList";
import { AiFillHome } from "react-icons/ai";
import { FaAngleDoubleLeft } from "react-icons/fa";
import {
  MdForum,
  MdQuiz,
  MdMenuBook,
  MdOutlineAddTask,
  MdOutlineSettings,
} from "react-icons/md";

export default function LayoutDas({
  children,
  active,
  menuShow,
  setMenuShow,
}: {
  children: React.ReactNode;
  active: string;
  menuShow: boolean;
  setMenuShow: Function;
}) {
  return (
    <main
      className="w-full h-[100vh] flex  font-[Montserrat]"
      style={{ background: lightColor }}
    >
      <section className="w-[25%] h-full  p-5 hidden lg:flex">
        <section
          style={{ background: primaryColor }}
          className="flex-1 rounded-xl"
        >
          <h4 className="text-white font-bold text-center pt-5 pb-10 text-[20px]">
            LMS MIM BITUNG
          </h4>
          <section className="px-10">
            <p className="text-white font-[12px] font-medium opacity-50 mb-5">
              User Tools
            </p>
            <MenuList
              active={active === "Dashboard"}
              label="Dashboard"
              goto="/dashboard"
              icon={<AiFillHome />}
            />
            <MenuList
              active={active === "Forum"}
              label="Forum"
              goto="/dashboard/forum"
              icon={<MdForum />}
            />
            <MenuList
              active={active === "Quiz"}
              label="Quiz"
              goto="/dashboard/quiz"
              icon={<MdQuiz />}
            />
            <MenuList
              active={active === "Materi"}
              label="Materi"
              goto="/dashboard/materi"
              icon={<MdMenuBook />}
            />
            <MenuList
              active={active === "Tugas"}
              label="Tugas"
              goto="/dashboard/tugas"
              icon={<MdOutlineAddTask />}
            />
            <MenuList
              active={active === "Pengaturan"}
              label="Pengaturan"
              goto="/dashboard/pengaturan"
              icon={<MdOutlineSettings />}
            />
          </section>
          <section></section>
        </section>
      </section>
      {/* mobile side bar */}
      <section
        style={{ marginLeft: menuShow ? 0 : "-100%" }}
        className="w-[100%] duration-200 fixed bg-black bg-opacity-20 z-20 h-full flex lg:hidden"
      >
        <section
          style={{ background: primaryColor }}
          className="flex-1 flex flex-col"
        >
          <h4 className="text-white font-bold text-center pt-5 pb-10 text-[20px]">
            LMS MIM BITUNG
          </h4>
          <section className="px-10">
            <p className="text-white font-[12px] font-medium opacity-50 mb-5">
              User Tools
            </p>
            <MenuList
              active={active === "Dashboard"}
              label="Dashboard"
              goto="/dashboard"
              icon={<AiFillHome />}
            />
            <MenuList
              active={active === "Forum"}
              label="Forum"
              goto="/dashboard/forum"
              icon={<MdForum />}
            />
            <MenuList
              active={active === "Quiz"}
              label="Quiz"
              goto="/dashboard/quiz"
              icon={<MdQuiz />}
            />
            <MenuList
              active={active === "Materi"}
              label="Materi"
              goto="/dashboard/materi"
              icon={<MdMenuBook />}
            />
            <MenuList
              active={active === "Tugas"}
              label="Tugas"
              goto="/dashboard/tugas"
              icon={<MdOutlineAddTask />}
            />
            <MenuList
              active={active === "Pengaturan"}
              label="Pengaturan"
              goto="/dashboard/pengaturan"
              icon={<MdOutlineSettings />}
            />
          </section>
          <section className="flex items-center justify-center flex-1">
            <button
              onClick={() => setMenuShow(false)}
              className="w-[100px] bg-white h-[50px] border flex items-center justify-center  text-[30px] rounded-full"
            >
              <FaAngleDoubleLeft />
            </button>
          </section>
        </section>
        <section className=" w-[25%]"></section>
      </section>

      <section className="flex-1">{children}</section>
    </main>
  );
}
