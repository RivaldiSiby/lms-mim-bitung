import AuthComponent from "@/components/layout/AuthComponent";
import BoxStatus from "@/components/layout/BoxStatus";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import Loading from "@/components/layout/Loading";
import NotFound from "@/components/layout/NotFound";
import RolePengajar from "@/components/layout/RolePengajar";
import { getQuiz } from "@/firebase/firestore/quiz";
import { grayColor, primaryColor } from "@/helpers/color";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Swal from "sweetalert2";

export default function Detail() {
  const router: any = useRouter();
  const [menuShow, setMenuShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<any>(false);
  const session: any = useSession();

  useEffect(() => {
    (async () => {
      if (router.query?.id && session?.data?.user?.name?.role) {
        const res = await getQuiz(router.query?.id);
        if (res === null) setData(null);
        return setData(res);
      }
    })();
  }, [router.query, session]);

  const handlerStart = async () => {
    return Swal.fire({
      title: "Apakah anda Yakin ?",
      text: "Untuk memulai quiz",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Mulai Quiz");
      }
    });
  };

  return (
    <AuthComponent>
      <RolePengajar link="/dashboard/quiz">
        {data === false || isLoading ? (
          <Loading />
        ) : (
          <LayoutDas
            menuShow={menuShow}
            setMenuShow={setMenuShow}
            active="Tugas"
          >
            <section className="w-full h-full ">
              {data === null ? (
                <NotFound
                  goto="/dashboard/quiz"
                  text="Data Quiz Tidak Ditemukan"
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
                    Quiz
                  </p>
                  <button
                    onClick={() => router.push("/dashboard/tugas")}
                    className="md:text-[30px] text-[25px] border p-2 px-5 rounded-full border-[#7E72F4] "
                    style={{ color: primaryColor }}
                  >
                    <MdKeyboardArrowLeft />
                  </button>
                </section>
              </section>
              <section className="px-5 w-full ">
                {/* detail quiz */}
                <section className="w-full h-[70px] border flex items-center px-3 bg-white shadow mb-3">
                  <BoxStatus status={1} />
                  <section className="flex-1 mx-5 my-2 border-l-2 px-5 flex flex-col justify-center">
                    <p className="lg:text-[16px] text-[14px] font-bold">
                      {data?.title}
                    </p>
                    <p
                      className="lg:text-[12px] text-[10px]"
                      style={{ color: grayColor }}
                    >
                      {data?.desc}
                    </p>
                  </section>
                </section>
                <section className="w-full border flex sm:flex-row flex-col">
                  <section className="sm:w-[40%] w-full mr-5 min-h-[70px] border flex flex-col justify-center items-center px-3 bg-white shadow mb-3  p-3">
                    <h5 className="lg:text-[50px] text-[30px] text-gray-500 text-opacity-30 font-bold">
                      {data?.kode}
                    </h5>
                    <p className="lg:text-[14px] text-[12px]">Kode Quiz</p>
                  </section>
                  <Link
                    href={`/dashboard/quiz/task/${router.query?.id}`}
                    style={{ background: primaryColor }}
                    className="sm:w-[30%] w-full mr-5 min-h-[70px] border flex flex-col justify-center items-center px-3 bg-white shadow mb-3  p-3"
                  >
                    <p className="lg:text-[20px] text-[20px] font-bold text-white">
                      Kelola Soal
                    </p>
                  </Link>
                  <button
                    onClick={() => handlerStart()}
                    style={{ background: primaryColor }}
                    className="sm:w-[30%] w-full  min-h-[70px] border flex flex-col justify-center items-center px-3 bg-white shadow mb-3  p-3"
                  >
                    <p className="lg:text-[20px] text-[20px] font-bold text-white">
                      Mulai
                    </p>
                  </button>
                </section>
              </section>
            </section>
          </LayoutDas>
        )}
      </RolePengajar>
    </AuthComponent>
  );
}
