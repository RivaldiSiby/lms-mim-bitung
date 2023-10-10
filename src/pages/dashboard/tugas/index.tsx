import BtnIcon from "@/components/form/BtnIcon";
import BtnSection from "@/components/form/BtnSection";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor } from "@/helpers/color";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ListMateri from "./components/ListTugas";

export default function Tugas() {
  const [menuShow, setMenuShow] = useState(false);
  const [screen, setScreen] = useState<any>(false);

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
              {screen?.w > 768 ? (
                <BtnSection
                  handler={() => console.log("gabung")}
                  label={"KODE TUGAS"}
                />
              ) : (
                <BtnIcon
                  handler={() => console.log("gabung")}
                  label={<FaPlus />}
                />
              )}
            </section>
            <section className="mt-5 flex-1">
              <ListMateri
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={3}
                label="Tugas Matematika"
              />
              <ListMateri
                id="1"
                data={{}}
                date="4 Oktober 2023"
                status={1}
                label="Tugas Bahas Indonesia"
              />
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Tugas.requireAuth = true;
