import { tugasJoinCollection } from "@/firebase/firestore/tugas";
import { grayColor, primaryColor } from "@/helpers/color";
import { generateNameFile } from "@/helpers/generateNameFile";
import { limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import ListPengumpulan from "./ListPengumpulan";
import { checkStatus } from "@/helpers/checkStatus";

export default function FootDetail({
  data,
  setFile,
  file,
  id,
  dataPayload,
}: {
  data: any;
  setFile: Function;
  file: any;
  id: string;
  dataPayload: any;
}) {
  const dataAuth: any = useSession();
  const [dataPengajar, setDataPengajar] = useState([]);

  useEffect(() => {
    const qPengajar = query(
      tugasJoinCollection,
      where("tugas_id", "==", id),
      limit(50)
    );

    const snapshot = onSnapshot(qPengajar, (res) => {
      const wrapdata: any = [];
      res.docs.forEach((doc: any) => {
        wrapdata.push({ ...doc.data(), id: doc.id });
      });
      setDataPengajar(wrapdata);
    });
    return () => snapshot();
  }, []);

  return (
    <>
      <section className="flex sm:flex-row flex-col">
        <section className="sm:w-[40%] w-full mr-5 min-h-[70px] border flex flex-col justify-center items-center px-3 bg-white shadow mb-3  p-3">
          <h5 className="lg:text-[50px] text-[30px] text-gray-500 text-opacity-30 font-bold">
            {data?.code}
          </h5>
          <p className="lg:text-[14px] text-[12px]">Kode Tugas</p>
        </section>
        {dataAuth?.data?.user?.name?.role === "siswa" ? (
          <section className="flex-1 min-h-[70px] border flex sm:flex-row flex-col-reverse items-center px-3 bg-white shadow mb-3 py-3">
            <section className="flex sm:flex-col flex-row">
              <section className="flex items-center my-2">
                <span className="text-[20px]" style={{ color: primaryColor }}>
                  <AiFillCheckCircle />
                </span>
                <p className="px-3 lg:text-[14px] text-[12px]">JPG / PNG</p>
              </section>
              <section className="flex items-center my-2">
                <span className="text-[20px]" style={{ color: primaryColor }}>
                  <AiFillCheckCircle />
                </span>
                <p className="px-3 lg:text-[14px] text-[12px]">WORD / PPT</p>
              </section>
              <section className="flex items-center my-2">
                <span className="text-[20px]" style={{ color: primaryColor }}>
                  <AiFillCheckCircle />
                </span>
                <p className="px-3 lg:text-[14px] text-[12px]">PDF</p>
              </section>
            </section>
            <section className="flex-1 h-full py-3 w-full ">
              <label
                htmlFor="filedata"
                className="sm:h-full h-[60px] w-full rounded-xl flex items-center justify-center text-white lg:text-[16px] text-[14px]"
                style={{
                  background:
                    dataPayload?.tugas_file === "" ? primaryColor : grayColor,
                }}
              >
                <span className="text-[30px] pr-5" style={{ color: "white" }}>
                  <AiOutlineCloudUpload />
                </span>
                {dataPayload?.tugas_file !== ""
                  ? "Sudah dikumpulan"
                  : !file
                  ? "UPLOAD TUGAS"
                  : generateNameFile(file?.name)}
              </label>
              <input
                disabled={data?.tugas_file === "" ? false : true}
                onChange={(e: any) => setFile(e.target.files[0])}
                type="file"
                name=""
                className="hidden"
                id="filedata"
              />
            </section>
          </section>
        ) : (
          <section className="flex-1 min-h-[70px] border flex sm:flex-row flex-col-reverse items-center px-3 bg-white shadow mb-3 py-3 ">
            <h5
              className=" font-bold w-full text-center text-[30px] opacity-50"
              style={{ color: grayColor }}
            >
              {dataPengajar?.length} Siswa Join
            </h5>
          </section>
        )}
      </section>
      {dataAuth?.data?.user?.name?.role === "siswa" ? (
        ""
      ) : (
        <>
          <section className="border ">
            <h5 className="font-medium pt-5 pb-5 ">Daftar Pengumpulan Tugas</h5>
            <section>
              {dataPengajar.length > 0
                ? dataPengajar.map((v: any) => (
                    <>
                      <ListPengumpulan data={v} status={checkStatus(v)} />
                    </>
                  ))
                : ""}
            </section>
          </section>
        </>
      )}
    </>
  );
}
