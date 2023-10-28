import BtnIcon from "@/components/form/BtnIcon";
import BtnSection from "@/components/form/BtnSection";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor } from "@/helpers/color";
import React, { useEffect, useState } from "react";
import { FaAd, FaSearch } from "react-icons/fa";
import ListMateri from "./components/ListMateri";
import {
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlinePlus,
  AiOutlineUser,
  AiTwotoneEdit,
} from "react-icons/ai";
import ModalWrap from "@/components/modal/ModalWrap";
import InputForm from "@/components/form/InputForm";
import InputFile from "@/components/form/InputFile";
import { HandlerFileMateri } from "@/firebase/storage/storage";
import { addMateri, materiCollection } from "@/firebase/firestore/materi";
import LoadingTransparant from "@/components/layout/LoadingTransparant";
import { limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase/config";

export default function Materi() {
  const [menuShow, setMenuShow] = useState(false);
  const [screen, setScreen] = useState<any>(false);
  const [modalShow, setModalShow] = useState(false);
  const [payload, setPayload] = useState<any>({
    title: "",
    desc: "",
    file: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (window) {
      setScreen({ w: window.innerWidth, h: window.innerHeight });
    }
  }, []);

  const submitUserHandler = async () => {
    try {
      setErrMsg("");
      setLoading(true);
      if (payload.title === "" || payload.desc === "" || payload.file === "")
        return setErrMsg("Ada Inputan yang belum di isi");
      // send img
      const url = await HandlerFileMateri(payload.file);

      const user = getAuth(app).currentUser;
      const payloadData = {
        title: payload.title,
        desc: payload.desc,
        file: url,
        creator: user?.email,
      };
      await addMateri(payloadData);
      setModalShow(false);
      setPayload({
        title: "",
        desc: "",
        file: "",
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
    const q = query(materiCollection, orderBy("created_at", "desc"), limit(50));
    const snapshot = onSnapshot(q, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setData(wrapdata);
    });
    return () => snapshot();
  }, []);
  return (
    <AuthComponent>
      <ModalWrap
        show={modalShow}
        close={() => setModalShow(false)}
        handler={() => submitUserHandler()}
        title="Tambah Materi"
        component={
          <>
            <InputForm
              isPassword={false}
              placeholder="Masukan Judul Materi"
              val={payload.title}
              setVal={(v: string) => setPayload({ ...payload, title: v })}
              icon={<AiOutlineEdit />}
            />
            <InputForm
              isPassword={false}
              placeholder="Masukan Deskripsi Materi"
              val={payload.desc}
              setVal={(v: string) => setPayload({ ...payload, desc: v })}
              icon={<AiTwotoneEdit />}
            />
            <InputFile
              placeholder="Masukan File Materi"
              setVal={(v: any) => setPayload({ ...payload, file: v })}
              icon={<AiOutlineFileAdd />}
            />
            <p className="text-[12px] text-red-500 font-[Montserrat]">
              {errMsg}
            </p>
          </>
        }
      />
      {loading ? <LoadingTransparant /> : ""}
      <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Materi">
        <section className="w-full h-full ">
          <HeaderDas setMenuShow={setMenuShow} />
          <section className="px-5">
            <section className="flex justify-between my-5 items-center mt-10">
              <p
                className="font-semibold  text-[16px]"
                style={{ color: grayColor }}
              >
                Materi
              </p>

              <section className="w-[110px] flex justify-between">
                <BtnIcon
                  handler={() => console.log("gabung")}
                  label={<FaSearch />}
                />
                <BtnIcon
                  handler={() => setModalShow(true)}
                  label={<AiOutlinePlus />}
                />
              </section>
            </section>
            <section className="mt-5 flex-1 pb-5">
              {data.map((item: any) => (
                <ListMateri
                  key={item?.id}
                  data={item}
                  desc={item?.desc}
                  label={item?.title}
                />
              ))}
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Materi.requireAuth = true;
