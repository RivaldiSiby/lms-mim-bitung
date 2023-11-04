import BtnSection from "@/components/form/BtnSection";
import InputBox from "@/components/form/InputBox";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor, primaryColor } from "@/helpers/color";
import React, { useEffect, useState } from "react";
import { MdQuiz, MdKey } from "react-icons/md";
import InfoTask from "../components/InfoTask";
import TaskExam from "../components/TaskExam";
import ModalWrap from "@/components/modal/ModalWrap";
import InputForm from "@/components/form/InputForm";
import {
  AiOutlineAlignLeft,
  AiOutlineBarcode,
  AiOutlineCheckSquare,
  AiOutlineEdit,
  AiTwotoneEdit,
} from "react-icons/ai";
import HeaderQuizTask from "../components/HeadQuizTask";
import InputArea from "@/components/form/InputArea";
import InputSelect from "@/components/form/InputSelect";
import ListPilihan from "../components/ListPilihan";
import RolePengajar from "@/components/layout/RolePengajar";
import { addQuizTask, quizTaskCollection } from "@/firebase/firestore/quiz";
import LoadingTransparant from "@/components/layout/LoadingTransparant";
import { useRouter } from "next/router";
import { limit, onSnapshot, orderBy, query, where } from "firebase/firestore";

export default function Task() {
  const [menuShow, setMenuShow] = useState(false);
  const router: any = useRouter();
  const [code, setCode] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [payload, setPayload] = useState({
    task: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    key_option: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const submitHandler = async () => {
    try {
      setErrMsg("");
      if (
        payload.task === "" ||
        payload.option_a === "" ||
        payload.option_b === "" ||
        payload.option_c === "" ||
        payload.option_d === "" ||
        payload.key_option === ""
      ) {
        return;
      }
      setLoading(true);
      // join class
      const payloadData = {
        task: payload.task,
        option_a: payload.option_a,
        option_b: payload.option_b,
        option_c: payload.option_c,
        option_d: payload.option_d,
        key_option: payload.key_option,
        quiz_id: router.query?.id,
      };

      await addQuizTask(payloadData);
      setPayload({
        task: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        key_option: "",
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
      quizTaskCollection,
      where("quiz_id", "==", !router.query?.id ? "" : router.query?.id)
      // orderBy("created_at", "asc")
    );

    const snapshot = onSnapshot(qPengajar, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setData(wrapdata);
    });
    return () => snapshot();
  }, [router]);

  return (
    <AuthComponent>
      {loading ? <LoadingTransparant /> : null}
      <RolePengajar link="/dashboard/quiz">
        <ModalWrap
          show={modalShow}
          close={() => setModalShow(false)}
          handler={() => submitHandler()}
          title="Tambah Soal Quiz"
          component={
            <>
              <InputArea
                isPassword={false}
                placeholder="Masukan Soal Quiz"
                val={payload.task}
                setVal={(v: string) => setPayload({ ...payload, task: v })}
                icon={<AiTwotoneEdit />}
              />
              <InputForm
                isPassword={false}
                placeholder="Masukan Pilihan A"
                val={payload.option_a}
                setVal={(v: string) => setPayload({ ...payload, option_a: v })}
                icon={<AiOutlineAlignLeft />}
              />
              <InputForm
                isPassword={false}
                placeholder="Masukan Pilihan B"
                val={payload.option_b}
                setVal={(v: string) => setPayload({ ...payload, option_b: v })}
                icon={<AiOutlineAlignLeft />}
              />
              <InputForm
                isPassword={false}
                placeholder="Masukan Pilihan C"
                val={payload.option_c}
                setVal={(v: string) => setPayload({ ...payload, option_c: v })}
                icon={<AiOutlineAlignLeft />}
              />
              <InputForm
                isPassword={false}
                placeholder="Masukan Pilihan D"
                val={payload.option_d}
                setVal={(v: string) => setPayload({ ...payload, option_d: v })}
                icon={<AiOutlineAlignLeft />}
              />
              <InputSelect
                isPassword={false}
                placeholder="Masukan Pilihan Yang benar"
                val={payload.key_option}
                setVal={(v: string) =>
                  setPayload({ ...payload, key_option: v })
                }
                icon={<AiOutlineCheckSquare />}
                option={
                  <>
                    <option value={"a"}>Pilihan A</option>
                    <option value={"b"}>Pilihan B</option>
                    <option value={"c"}>Pilihan C</option>
                    <option value={"d"}>Pilihan D</option>
                  </>
                }
              />

              <p className="text-[12px] text-red-500 font-[Montserrat]">
                {errMsg}
              </p>
            </>
          }
        />
        <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Quiz">
          <section className="w-full h-full pb-5 flex flex-col">
            <HeaderQuizTask setAtive={setModalShow} />
            <section className="p-5 flex-1 ">
              <section className=" pt-5 flex flex-col lg:flex-row w-full justify-between lg:items-center mb-10">
                <h5
                  className="lg:text-[18px] text-[16px] font-semibold"
                  style={{ color: primaryColor }}
                >
                  Kelola Soal
                </h5>
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
              {data.length > 0
                ? data.map((v: any, i: number) => (
                    <>
                      <TaskExam
                        no={`${i + 1}`}
                        soal={v?.task}
                        option={
                          <>
                            <ListPilihan
                              label="A"
                              value={v?.option_a}
                              active={v?.key_option === "a"}
                            />
                            <ListPilihan
                              label="B"
                              value={v?.option_b}
                              active={v?.key_option === "b"}
                            />
                            <ListPilihan
                              label="C"
                              value={v?.option_c}
                              active={v?.key_option === "c"}
                            />
                            <ListPilihan
                              label="D"
                              value={v?.option_d}
                              active={v?.key_option === "d"}
                            />
                          </>
                        }
                      />
                    </>
                  ))
                : ""}
            </section>
          </section>
        </LayoutDas>
      </RolePengajar>
    </AuthComponent>
  );
}

Task.requireAuth = true;
