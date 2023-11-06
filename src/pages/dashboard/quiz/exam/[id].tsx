import BtnSection from "@/components/form/BtnSection";
import InputBox from "@/components/form/InputBox";
import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import { grayColor, primaryColor } from "@/helpers/color";
import React, { useEffect, useReducer, useState } from "react";
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
  updateQuizJoin,
} from "@/firebase/firestore/quiz";
import { onSnapshot, query, where } from "firebase/firestore";
import ListPilihan from "../components/ListPilihan";
import { useSession } from "next-auth/react";
import { formatTimer } from "@/helpers/generateTime";
import Swal from "sweetalert2";
import { answerReducer, ininitalState } from "@/redux/reducer/Answer";
import ListPilihanQuiz from "../components/ListPilihanQuiz";
import LoadingTransparant from "@/components/layout/LoadingTransparant";

export default function Exam() {
  const [menuShow, setMenuShow] = useState(false);
  const [code, setCode] = useState("");
  const router: any = useRouter();
  const [data, setData] = useState<any>(false);
  const [dataTask, setDataTask] = useState([]);
  const [dataJoin, setDataJoin] = useState<any>(false);
  const session: any = useSession();
  const [timer, setTimer] = useState("");
  const [loading, setLoading] = useState(false);
  const [todo, dispatch] = useReducer(answerReducer, ininitalState);

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
    (() => {
      const dataPersist = localStorage.getItem("answerData");
      if (dataPersist) {
        dispatch({
          type: "ADD_DATA",
          payload: {
            data: JSON.parse(dataPersist),
          },
        });
      }
    })();
  }, []);

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
        sumbitDataHandler();
      }
    });
  };

  const sumbitDataHandler = async () => {
    try {
      setLoading(true);
      let wrapData = 0;
      dataTask.map((v: any) => {
        const dataCheckAnswer = todo.data.find((f: any) => f.taskId === v?.id);

        if (dataCheckAnswer) {
          if (v?.key_option === dataCheckAnswer.answer) wrapData += 1;
        }
      });

      console.log(wrapData);
      let calc = wrapData / dataTask.length;
      calc = calc * 100;

      const wrapJoin = dataJoin;
      wrapJoin.score = calc;
      wrapJoin.quiz_created_at = new Date().getTime();
      await updateQuizJoin(dataJoin?.id, wrapJoin);

      // update data
      const res = await getQuizJoin(
        router.query?.id,
        session?.data?.user?.name?.id
      );
      if (res === null) setDataJoin(null);
      setDataJoin(res);

      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const choseAnswerHandler = (taskId: string, answerOption: string) => {
    const wrapData = todo.data;
    const checkIndex = todo.data.findIndex((f: any) => taskId === f.taskId);

    let wrapPayload = [];

    if (checkIndex === -1) {
      const item = {
        taskId: taskId,
        answer: answerOption,
      };
      wrapPayload = [...wrapData, item];
    } else {
      wrapData[checkIndex].answer = answerOption;
      wrapPayload = wrapData;
    }

    // save to local storage
    localStorage.setItem("answerData", JSON.stringify(wrapPayload));

    dispatch({
      type: "ADD_DATA",
      payload: {
        data: wrapPayload,
      },
    });
    return;
  };

  return (
    <AuthComponent>
      {loading ? <LoadingTransparant /> : ""}
      <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Quiz">
        <section className="w-full h-full pb-5 flex flex-col">
          <HeaderQuiz
            dataJoin={dataJoin}
            timer={
              data?.start_date_time === ""
                ? "BELUM MULAI"
                : dataJoin?.quiz_created_at !== ""
                ? "SELESAI"
                : timer
            }
          />
          {data?.start_date_time === "" && dataJoin?.quiz_created_at === "" ? (
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

                {timer === "waktu habis" || dataJoin?.quiz_created_at !== "" ? (
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
                {dataTask.length > 0 &&
                timer !== "waktu habis" &&
                dataJoin?.quiz_created_at === ""
                  ? dataTask.map((v: any, i: number) => (
                      <>
                        <TaskExam
                          key={v?.id}
                          no={`${i + 1}`}
                          soal={v?.task}
                          option={
                            <>
                              <ListPilihanQuiz
                                handler={() => choseAnswerHandler(v?.id, "a")}
                                label="A"
                                value={v?.option_a}
                                active={
                                  todo.data?.find((f: any) => f.taskId === v.id)
                                    ?.answer === "a"
                                }
                              />
                              <ListPilihanQuiz
                                handler={() => choseAnswerHandler(v?.id, "b")}
                                label="B"
                                value={v?.option_b}
                                active={
                                  todo.data?.find((f: any) => f.taskId === v.id)
                                    ?.answer === "b"
                                }
                              />
                              <ListPilihanQuiz
                                handler={() => choseAnswerHandler(v?.id, "c")}
                                label="C"
                                value={v?.option_c}
                                active={
                                  todo.data?.find((f: any) => f.taskId === v.id)
                                    ?.answer === "c"
                                }
                              />
                              <ListPilihanQuiz
                                handler={() => choseAnswerHandler(v?.id, "d")}
                                label="D"
                                value={v?.option_d}
                                active={
                                  todo.data?.find((f: any) => f.taskId === v.id)
                                    ?.answer === "d"
                                }
                              />
                            </>
                          }
                        />
                      </>
                    ))
                  : ""}

                <section className="text-end py-5">
                  {dataJoin?.quiz_created_at === "" ? (
                    <BtnSection label="KIRIM" handler={() => handlerKirim()} />
                  ) : (
                    ""
                  )}
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
