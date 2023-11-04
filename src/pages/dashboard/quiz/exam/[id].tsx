import BtnSection from "@/components/form/BtnSection";
import InputBox from "@/components/form/InputBox";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor, primaryColor } from "@/helpers/color";
import React, { useEffect, useState } from "react";
import { MdQuiz, MdKey } from "react-icons/md";
import HeaderQuiz from "../components/HeaderQuiz";
import InfoTask from "../components/InfoTask";
import TaskExam from "../components/TaskExam";
import { useRouter } from "next/router";
import {
  getQuiz,
  getQuizJoin,
  quizCollection,
  quizTaskCollection,
} from "@/firebase/firestore/quiz";
import { onSnapshot, query, where } from "firebase/firestore";
import ListPilihan from "../components/ListPilihan";
import { useSession } from "next-auth/react";
import { formatTimer } from "@/helpers/generateTime";
import Swal from "sweetalert2";

export default function Exam() {
  const [menuShow, setMenuShow] = useState(false);
  const [code, setCode] = useState("");
  const router: any = useRouter();
  const [data, setData] = useState<any>(false);
  const [dataTask, setDataTask] = useState([]);
  const [dataJoin, setDataJoin] = useState<any>(false);
  const session: any = useSession();
  const [timer, setTimer] = useState("");

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
      setDataTask(wrapdata);
    });
    return () => snapshot();
  }, [router]);

  useEffect(() => {
    const qPengajar = query(quizCollection);

    const snapshot = onSnapshot(qPengajar, (res) => {
      return (async () => {
        if (router.query?.id && session?.data?.user?.name?.role) {
          const res = await getQuiz(router.query?.id);
          if (res === null) setData(null);
          return setData(res);
        }
      })();
    });
    return () => snapshot();
  }, [router]);

  useEffect(() => {
    (async () => {
      if (router.query?.id && session?.data?.user?.name?.role) {
        const res = await getQuizJoin(
          router.query?.id,
          session?.data?.user?.name?.id
        );
        if (res === null) setDataJoin(null);
        return setDataJoin(res);
      }
    })();
  }, [router.query, session]);

  useEffect(() => {
    (async () => {
      if (router.query?.id && session?.data?.user?.name?.role) {
        const res = await getQuiz(router.query?.id);
        if (res === null) setData(null);
        return setData(res);
      }
    })();
  }, [router.query, session]);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setTimer(formatTimer(data?.start_date_time, data?.time));
    }, 1000);

    return () => clearInterval(intervalTimer);
  });

  const handlerKirim = async () => {
    return Swal.fire({
      title: "Apakah anda Yakin ?",
      text: "Untuk mengirim hasil dari Quiz yang diikuti",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("kirim");
      }
    });
  };

  console.log(dataJoin);

  return (
    <AuthComponent>
      <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Quiz">
        <section className="w-full h-full pb-5 flex flex-col">
          <HeaderQuiz
            timer={
              data?.start_date_time === ""
                ? "BELUM MULAI"
                : dataJoin?.quiz_created_at !== ""
                ? "SELESAI"
                : timer
            }
          />
          {data?.start_date_time === "" ? (
            <section className="mt-5 mr-2">
              {/* info task quiz belum di mulai */}
              <InfoTask
                score={false}
                msg="Quiz Belum dimulai , Silahkan menghubungi pengajar untuk informasi lebih lanjut . . ."
              />
            </section>
          ) : (
            <>
              <section className="p-5 flex-1 ">
                <section className=" pt-5 flex flex-col lg:flex-row w-full justify-between lg:items-center mb-10">
                  <h5
                    className="lg:text-[18px] text-[16px] font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {data?.title} ( {dataTask.length} Soal - Durasi {data?.time}{" "}
                    Menit )
                  </h5>
                  <p
                    className="lg:text-[14px] text-[12px] font-medium pt-2 lg:pt-0"
                    style={{ color: grayColor }}
                  ></p>
                </section>

                {timer === "waktu habis" ? (
                  <>
                    {/* info task quiz sudah selesai */}
                    <InfoTask
                      score={dataJoin?.score}
                      msg="Quiz Telah selesai , silahkan kirim jawaban anda ke server dan tunggu untuk peroleh nilai hasil quiz"
                    />
                  </>
                ) : (
                  ""
                )}

                {/* task quiz info */}
                {dataTask.length > 0 && timer !== "waktu habis"
                  ? dataTask.map((v: any, i: number) => (
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

                <section className="text-end py-5">
                  <BtnSection label="KIRIM" handler={() => handlerKirim()} />
                </section>
              </section>
            </>
          )}
        </section>
      </LayoutDas>
    </AuthComponent>
  );
}

Exam.requireAuth = true;
