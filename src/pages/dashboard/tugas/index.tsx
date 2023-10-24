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
import {
  addTugas,
  addTugasJoin,
  getDataTugasByCode,
  tugasCollection,
  tugasJoinCollection,
} from "@/firebase/firestore/tugas";
import InputArea from "@/components/form/InputArea";
import { limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import ListTugas from "./components/ListTugas";
import { generateDateInfo, generateDateStatus } from "@/helpers/dateCheck";
import generateUserData from "@/helpers/generateUserData";
import { useSession } from "next-auth/react";

export default function Tugas() {
  const [menuShow, setMenuShow] = useState(false);
  const [screen, setScreen] = useState<any>(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalKode, setModalKode] = useState(false);
  const [payload, setPayload] = useState<any>({
    title: "",
    desc: "",
    kode: "",
    date: "",
  });
  const [payloadKode, setPayloadKode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState<any>(false);
  const dataAuth: any = useSession();

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

      const user: any = await generateUserData();
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

  const submitJoinTugas = async () => {
    try {
      setErrMsg("");
      setLoading(true);
      const res: any = await getDataTugasByCode(payloadKode);
      if (!res) {
        setLoading(false);
        return setErrMsg("Tugas tidak ditemukan");
      }

      // join class
      const payloadData = {
        tugas_payload: res,
        user: dataAuth?.data?.user,
        user_created: user?.id,
        tugas_file: "",
        tugas_created_at: "",
        tugas_id: res.id,
      };

      await addTugasJoin(payloadData);
      setPayloadKode("");
      setModalKode(false);
      setLoading(false);
      return;
    } catch (error: any) {
      setLoading(false);
      return setErrMsg(error.message);
    }
  };

  useEffect(() => {
    generateUserData()
      .then((res: any) => {
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const qPengajar = query(
      tugasCollection,
      where("creator", "==", !user?.email ? "" : user?.email),
      limit(50)
    );
    const qSiswa = query(
      tugasJoinCollection,
      where("user_created", "==", !user?.id ? "" : user?.id),
      limit(50)
    );
    const snapshot = onSnapshot(
      user?.role === "siswa" ? qSiswa : qPengajar,
      (res) => {
        const wrapdata: any = [];
        res.docs.forEach((doc: any) => {
          wrapdata.push({ ...doc.data(), id: doc.id });
        });
        setData(wrapdata);
      }
    );
    return () => snapshot();
  }, [user]);

  // console.log(user);

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
      <ModalWrap
        show={modalKode}
        close={() => setModalKode(false)}
        handler={() => submitJoinTugas()}
        title="Tambah Tugas"
        component={
          <>
            <InputForm
              isPassword={false}
              placeholder="Masukan Kode Untuk Join Tugas"
              val={payloadKode}
              setVal={(v: string) => setPayloadKode(v)}
              icon={<AiOutlineEdit />}
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
                {dataAuth?.data?.user?.name?.role === "siswa" ? (
                  <>
                    {screen?.w > 768 ? (
                      <BtnSection
                        handler={() => setModalKode(true)}
                        label={"KODE TUGAS"}
                      />
                    ) : (
                      <BtnIcon
                        handler={() => setModalKode(true)}
                        label={<FaPlus />}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}
                {dataAuth?.data?.user?.name?.role === "pengajar" ? (
                  <>
                    <BtnIcon
                      handler={() => setModalShow(true)}
                      label={<AiOutlinePlus />}
                    />
                  </>
                ) : (
                  ""
                )}
              </section>
            </section>
            <section className="mt-5 flex-1">
              {dataAuth?.data?.user?.name?.role === "siswa" ? (
                <>
                  {data.map((v: any) => (
                    <ListTugas
                      key={v.id}
                      id={v.tugas_payload.id}
                      data={v.tugas_payload}
                      date={generateDateInfo(v.tugas_payload.date)}
                      status={generateDateStatus(v.tugas_payload.date)}
                      label={v.tugas_payload.title}
                    />
                  ))}
                </>
              ) : (
                <>
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
                </>
              )}
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Tugas.requireAuth = true;
