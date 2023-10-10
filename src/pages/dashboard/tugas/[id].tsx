import BtnIcon from "@/components/form/BtnIcon";
import BtnSection from "@/components/form/BtnSection";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor, primaryColor } from "@/helpers/color";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ListMateri from "./components/ListTugas";
import DetailTugas from "./components/Detail";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/router";
import FootDetail from "./components/FootDetail";

export default function Detail() {
  const [menuShow, setMenuShow] = useState(false);
  const [screen, setScreen] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    if (window) {
      setScreen({ w: window.innerWidth, h: window.innerHeight });
    }
  }, []);

  return (
    <AuthComponent>
      <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Tugas">
        <section className="w-full h-full ">
          <HeaderDas setMenuShow={setMenuShow} />
          <section className="px-5">
            <section className="flex justify-between my-5 items-center mt-10">
              <p
                className="font-semibold  text-[16px]"
                style={{ color: grayColor }}
              >
                Tugas
              </p>
              <button
                onClick={() => router.push("/dashboard/tugas")}
                className="md:text-[30px] text-[25px] border p-2 px-5 rounded-full border-[#7E72F4] "
                style={{ color: primaryColor }}
              >
                <MdKeyboardArrowLeft />
              </button>
            </section>
            <section className="mt-5 flex-1">
              <DetailTugas
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={3}
                label="Tugas Matematika"
              />
              <section className="w-full min-h-[70px] border flex items-center px-3 bg-white shadow mb-3">
                <p
                  className="sm:text-[14px] text-[14px]"
                  style={{ color: grayColor }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  optio quae vitae quas corrupti fuga deserunt labore hic nemo,
                  nam animi exercitationem harum accusantium excepturi inventore
                  vel libero, commodi suscipit.
                </p>
              </section>
              {/* foot */}
              <FootDetail />
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Detail.requireAuth = true;
