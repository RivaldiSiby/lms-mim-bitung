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
import Loading from "@/components/layout/Loading";
import {
  getTugas,
  getTugasJoin,
  postFileTugas,
  tugasJoinCollection,
} from "@/firebase/firestore/tugas";
import NotFound from "@/components/layout/NotFound";
import { generateDateInfo, generateDateStatus } from "@/helpers/dateCheck";
import { useSession } from "next-auth/react";
import { HandlerFileTugas } from "@/firebase/storage/storage";
import { limit, onSnapshot, orderBy, query, where } from "firebase/firestore";

export default function Detail() {
  const [menuShow, setMenuShow] = useState(false);
  const [screen, setScreen] = useState<any>(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<any>(false);
  const router: any = useRouter();
  const session: any = useSession();
  const [file, setFile] = useState("");

  useEffect(() => {
    if (window) {
      setScreen({ w: window.innerWidth, h: window.innerHeight });
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (router.query?.id && session?.data?.user?.name?.role) {
        if (session?.data?.user?.name?.role === "siswa") {
          const res = await getTugasJoin(
            router.query?.id,
            session?.data?.user?.name?.id
          );
          if (res === null) setData(null);
          return setData(res);
        } else {
          const res = await getTugas(router.query?.id);
          if (res === null) setData(null);
          return setData(res);
        }
      }
    })();
  }, [router.query, session]);

  console.log(data);

  const submitFileTugas = async () => {
    try {
      if (file === "") return;
      setLoading(true);
      // upload file
      const url = await HandlerFileTugas(file);
      // update join tugas
      const payload = { ...data, tugas_file: url };
      await postFileTugas(data.id, payload);
      // update data
      const res = await getTugasJoin(
        router.query?.id,
        session?.data?.user?.name?.id
      );
      // if (res === null) setData(null);
      setData(res);

      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [dataPengajar, setDataPengajar] = useState([]);

  return (
    <AuthComponent>
      {data === false || isLoading ? (
        <Loading />
      ) : (
        <LayoutDas menuShow={menuShow} setMenuShow={setMenuShow} active="Tugas">
          <section className="w-full h-full ">
            {data === null ? (
              <NotFound
                goto="/dashboard/tugas"
                text="Data Tugas Tidak Ditemukan"
              />
            ) : (
              ""
            )}
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
                {session?.data?.user?.name?.role === "siswa" ? (
                  <DetailTugas
                    id="1"
                    data={data?.tugas_payload}
                    date={generateDateInfo(data?.tugas_payload?.date)}
                    status={generateDateStatus(data?.tugas_payload?.date)}
                    label={data?.tugas_payload?.title}
                  />
                ) : (
                  <DetailTugas
                    id="1"
                    data={data}
                    date={generateDateInfo(data?.date)}
                    status={generateDateStatus(data?.date)}
                    label={data?.title}
                  />
                )}
                <section className="w-full min-h-[70px] border flex items-center px-3 bg-white shadow mb-3">
                  <p
                    className="sm:text-[14px] text-[14px]"
                    style={{ color: grayColor }}
                  >
                    {session?.data?.user?.name?.role === "siswa"
                      ? data?.tugas_payload?.desc
                      : data?.desc}
                  </p>
                </section>
                {/* foot */}
                <FootDetail
                  id={router.query?.id}
                  setFile={setFile}
                  file={file}
                  dataPayload={
                    session?.data?.user?.name?.role === "siswa" ? data : false
                  }
                  data={
                    session?.data?.user?.name?.role === "siswa"
                      ? data?.tugas_payload
                      : data
                  }
                />
                {data?.tugas_file === "" ? (
                  <section className="pt-5">
                    <BtnSection
                      label={"SUBMIT"}
                      handler={() => submitFileTugas()}
                    />
                  </section>
                ) : (
                  ""
                )}
              </section>
            </section>
          </section>
        </LayoutDas>
      )}
    </AuthComponent>
  );
}

Detail.requireAuth = true;
