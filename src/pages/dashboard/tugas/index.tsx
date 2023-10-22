import BtnIcon from "@/components/form/BtnIcon";
import BtnSection from "@/components/form/BtnSection";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor } from "@/helpers/color";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ListMateri from "./components/ListTugas";
import ModalWrap from "@/components/modal/ModalWrap";
import InputForm from "@/components/form/InputForm";
import {
  AiOutlineBarcode,
  AiOutlineCarryOut,
  AiOutlineEdit,
  AiOutlinePlus,
  AiTwotoneEdit,
} from "react-icons/ai";
import LoadingTransparant from "@/components/layout/LoadingTransparant";
import InputDate from "@/components/form/InputDate";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase/config";
import { addTugas, tugasCollection } from "@/firebase/firestore/tugas";
import InputArea from "@/components/form/InputArea";
import { limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import ListTugas from "./components/ListTugas";
import { generateDateInfo, generateDateStatus } from "@/helpers/dateCheck";

export default function Tugas() {
  const [menuShow, setMenuShow] = useState(false);
  const [screen, setScreen] = useState<any>(false);
  const [modalShow, setModalShow] = useState(false);
  const [payload, setPayload] = useState<any>({
    title: "",
    desc: "",
    kode: "",
    date: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const user = getAuth(app).currentUser;

  useEffect(() => {
    if (window) {
      setScreen({ w: window.innerWidth, h: window.innerHeight });
    }
  }, []);

  const submitUserHandler = async () => {
    try {
      setErrMsg("");
      setLoading(true);
      if (
        payload.title === "" ||
        payload.desc === "" ||
        payload.kode === "" ||
        payload.date === ""
      )
        return setErrMsg("Ada Inputan yang belum di isi");

      const user = getAuth(app).currentUser;
      const payloadData = {
        title: payload.title,
        desc: payload.desc,
        code: payload.kode,
        date: payload.date,
        creator: user?.email,
      };
      await addTugas(payloadData);
      setModalShow(false);
      setPayload({
        title: "",
        desc: "",
        kode: "",
        date: "",
      });
      setLoading(false);
      return;
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      return setErrMsg(error.message);
    }
  };

  useEffect(() => {
    const q = query(
      tugasCollection,
      where("creator", "==", !user?.email ? "" : user?.email),
      limit(50)
    );
    const snapshot = onSnapshot(q, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setData(wrapdata);
    });
    return () => snapshot();
  }, [user]);

  console.log(user);

  return (
    <AuthComponent>
      <ModalWrap
        show={modalShow}
        close={() => setModalShow(false)}
        handler={() => submitUserHandler()}
        title="Tambah Tugas"
        component={
          <>
            <InputForm
              isPassword={false}
              placeholder="Masukan Judul Tugas"
              val={payload.title}
              setVal={(v: string) => setPayload({ ...payload, title: v })}
              icon={<AiOutlineEdit />}
            />
            <InputArea
              isPassword={false}
              placeholder="Masukan Deskripsi Tugas"
              val={payload.desc}
              setVal={(v: string) => setPayload({ ...payload, desc: v })}
              icon={<AiTwotoneEdit />}
            />
            <InputForm
              isPassword={false}
              placeholder="Kode Tugas"
              val={payload.kode}
              setVal={(v: string) => setPayload({ ...payload, kode: v })}
              icon={<AiOutlineBarcode />}
            />
            <InputDate
              isPassword={false}
              placeholder="Masukan Batas Waktu Pengumpulan Tugas"
              val={payload.date}
              setVal={(v: string) => setPayload({ ...payload, date: v })}
              icon={<AiOutlineCarryOut />}
            />

            <p className="text-[12px] text-red-500 font-[Montserrat]">
              {errMsg}
            </p>
          </>
        }
      />
      {loading ? <LoadingTransparant /> : ""}
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
              <section className="items-center flex">
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
                <BtnIcon
                  handler={() => setModalShow(true)}
                  label={<AiOutlinePlus />}
                />
              </section>
            </section>
            <section className="mt-5 flex-1">
              {data.map((v: any) => (
                <ListTugas
                  key={v.id}
                  id={v.id}
                  data={v}
                  date={generateDateInfo(v.date)}
                  status={generateDateStatus(v.date)}
                  label={v.title}
                />
              ))}
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Tugas.requireAuth = true;
