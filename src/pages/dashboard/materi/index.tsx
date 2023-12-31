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
  AiOutlineSearch,
  AiOutlineUser,
  AiTwotoneEdit,
} from "react-icons/ai";
import ModalWrap from "@/components/modal/ModalWrap";
import InputForm from "@/components/form/InputForm";
import InputFile from "@/components/form/InputFile";
import { HandlerFileMateri } from "@/firebase/storage/storage";
import {
  addMateri,
  getDataMateri,
  materiCollection,
} from "@/firebase/firestore/materi";
import LoadingTransparant from "@/components/layout/LoadingTransparant";
import { limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase/config";
import { orderByChild } from "firebase/database";
import { useSession } from "next-auth/react";

export default function Materi() {
  const [menuShow, setMenuShow] = useState(false);
  const [screen, setScreen] = useState<any>(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowSearch, setModalShowSearch] = useState(false);
  const [payload, setPayload] = useState<any>({
    title: "",
    desc: "",
    file: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSeacrh] = useState("");
  const session: any = useSession();

  console.log(session);

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

      const user = session?.data?.user?.name;
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
    const q = query(materiCollection, orderBy("created_at", "desc"));
    const snapshot = onSnapshot(q, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setData(wrapdata);
    });
    return () => snapshot();
  }, []);

  const handlerSearch = async () => {
    try {
      console.log(search);
      setLoading(true);
      const resData: any = await getDataMateri();
      console.log(resData);
      const wrap = resData;

      setData(
        wrap.filter(
          (f: any) =>
            f?.title?.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            f?.creator?.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      );
      setModalShowSearch(false);
      setSeacrh("");
      setLoading(false);
      return;
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setErrMsg(error);
    }
  };

  console.log("test data sesi", session?.data?.user?.name);
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
      <ModalWrap
        show={modalShowSearch}
        close={() => setModalShowSearch(false)}
        handler={() => handlerSearch()}
        title="Cari Materi"
        component={
          <>
            <InputForm
              isPassword={false}
              placeholder="Cari Materi berdasarkan judul / pembuat"
              val={search}
              setVal={(v: string) => setSeacrh(v)}
              icon={<AiOutlineSearch />}
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
                  handler={() => setModalShowSearch(true)}
                  label={<FaSearch />}
                />
                {session?.data?.user?.name?.role === "siswa" ? (
                  ""
                ) : (
                  <BtnIcon
                    handler={() => setModalShow(true)}
                    label={<AiOutlinePlus />}
                  />
                )}
              </section>
            </section>
            <section className="mt-5 flex-1 pb-5">
              {data.length > 0
                ? data.map((item: any) => (
                    <ListMateri
                      key={item?.id}
                      data={item}
                      desc={item?.desc}
                      label={item?.title}
                    />
                  ))
                : "Data Tidak ditemukan..."}
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Materi.requireAuth = true;
