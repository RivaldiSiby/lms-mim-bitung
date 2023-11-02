import BtnSection from "@/components/form/BtnSection";
import InputBox from "@/components/form/InputBox";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor, primaryColor } from "@/helpers/color";
import React, { useEffect, useState } from "react";
import { MdQuiz, MdKey } from "react-icons/md";
import ListQuiz from "./components/ListQuiz";
import InfoUserLayout from "@/components/layout/InfoUserLayout";
import ModalWrap from "@/components/modal/ModalWrap";
import InputForm from "@/components/form/InputForm";
import {
  AiOutlineAlignLeft,
  AiOutlineBarcode,
  AiOutlineEdit,
  AiOutlineFieldTime,
} from "react-icons/ai";
import InputNum from "@/components/form/InputNum";
import { addQuiz, quizCollection } from "@/firebase/firestore/quiz";
import Loading from "@/components/layout/Loading";
import LoadingTransparant from "@/components/layout/LoadingTransparant";
import { useSession } from "next-auth/react";
import { limit, onSnapshot, query, where } from "firebase/firestore";

export default function Quiz() {
  const [menuShow, setMenuShow] = useState(false);
  const [code, setCode] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [payload, setPayload] = useState({
    title: "",
    desc: "",
    kode: "",
    time: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const session: any = useSession();
  const [data, setData] = useState([]);

  const submitQuiz = async () => {
    try {
      setErrMsg("");
      if (
        payload.title === "" ||
        payload.desc === "" ||
        payload.time === "" ||
        payload.kode === "" ||
        payload.time === ""
      ) {
        return;
      }
      setLoading(true);
      // join class
      const payloadData = {
        title: payload.title,
        desc: payload.desc,
        kode: payload.kode,
        time: payload.time,
        creator: session?.data?.user?.name?.email,
        status: "1",
      };

      await addQuiz(payloadData);
      setPayload({
        title: "",
        desc: "",
        kode: "",
        time: "",
      });

      setErrMsg("");
      setModalShow(false);
      setLoading(false);
      return;
    } catch (error: any) {
      setLoading(false);
      return setErrMsg(error.message);
    }
  };

  useEffect(() => {
    const qPengajar = query(
      quizCollection,
      where(
        "creator",
        "==",
        !session?.data?.user?.name?.email
          ? ""
          : session?.data?.user?.name?.email
      ),
      limit(50)
    );

    const snapshot = onSnapshot(qPengajar, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setData(wrapdata);
    });
    return () => snapshot();
  }, [session]);

  console.log(data);

  return (
    <AuthComponent>
      {loading ? <LoadingTransparant /> : null}
      <ModalWrap
        show={modalShow}
        close={() => setModalShow(false)}
        handler={() => submitQuiz()}
        title="Tambah Quiz"
        component={
          <>
            <InputForm
              isPassword={false}
              placeholder="Masukan Judul Quiz"
              val={payload.title}
              setVal={(v: string) => setPayload({ ...payload, title: v })}
              icon={<AiOutlineEdit />}
            />
            <InputForm
              isPassword={false}
              placeholder="Masukan Deskripsi singkat"
              val={payload.desc}
              setVal={(v: string) => setPayload({ ...payload, desc: v })}
              icon={<AiOutlineAlignLeft />}
            />
            <InputNum
              isPassword={false}
              placeholder="Waktu ujian (menit)"
              val={payload.time}
              setVal={(v: string) => setPayload({ ...payload, time: v })}
              icon={<AiOutlineFieldTime />}
            />
            <InputForm
              isPassword={false}
              placeholder="Masukan Kode untuk join ke quiz"
              val={payload.kode}
              setVal={(v: string) => setPayload({ ...payload, kode: v })}
              icon={<AiOutlineBarcode />}
            />

            <p className="text-[12px] text-red-500 font-[Montserrat]">
              {errMsg}
            </p>
          </>
        }
      />
      <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Quiz">
        <section className="w-full h-full ">
          <HeaderDas setMenuShow={setMenuShow} />
          <section className="px-5 ">
            <InfoUserLayout />
            {session?.data?.user?.name?.role === "siswa" ? (
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
            ) : (
              <section className="w-full text-end">
                <BtnSection
                  handler={() => setModalShow(true)}
                  label="Buat Quiz"
                />
              </section>
            )}

            <p
              className="font-semibold mb-5 text-[16px]"
              style={{ color: grayColor }}
            >
              Quiz Yang diikuti
            </p>
            <section className="pb-5">
              {data.length > 0
                ? data.map((v: any) => (
                    <>
                      <ListQuiz
                        role={session?.data?.user?.name?.role}
                        id={v?.id}
                        data={v}
                        date={v?.desc}
                        status={parseInt(v?.status)}
                        label={v?.title}
                      />
                    </>
                  ))
                : ""}
            </section>
          </section>
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Quiz.requireAuth = true;
