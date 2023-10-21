import AuthComponent from "@/components/layout/AuthComponent";
import HeaderDas from "@/components/layout/HeaderDas";
import LayoutDas from "@/components/layout/LayoutDas";
import React, { useEffect, useState } from "react";
import { FaUser, FaUserGraduate } from "react-icons/fa";
import TitleHead from "../../components/TitleHead";
import BtnIcon from "@/components/form/BtnIcon";
import {
  AiFillMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import ModalWrap from "@/components/modal/ModalWrap";
import InputForm from "@/components/form/InputForm";
import { ErrorProps } from "next/error";
import { createUser, updateProfileUser } from "@/firebase/auth";
import { addUser, userCollection } from "@/firebase/firestore/user";
import LoadingTransparant from "@/components/layout/LoadingTransparant";
import { limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import ListUser from "../components/ListUser";

export default function Pengajar() {
  const [menuShow, setMenuShow] = useState(false);
  const [payload, setPayload] = useState({ nama: "", email: "", password: "" });
  const [modalShow, setModalShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const submitUserHandler = async () => {
    try {
      setLoading(true);
      setErrMsg("");
      if (
        payload.nama === "" ||
        payload.email === "" ||
        payload.password === ""
      )
        return setErrMsg("Ada Inputan yang belum di isi");

      if (payload.password.length < 8) {
        return setErrMsg("Password harus berisi 8 karakter atau lebih");
      }
      // create to auth
      const payloadUser = {
        email: payload.email,
        password: payload.password,
      };
      const res = await createUser(payloadUser);

      // create to firestore
      const payloadUserStore: any = {
        id: res.uid,
        nama: payload.nama,
        email: payload.email,
        role: "pengajar",
      };

      await addUser(payloadUserStore);

      setLoading(false);
      setModalShow(false);
      return;
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      const msgErr = error.message.split(" ");
      if (msgErr.length >= 3) {
        if (msgErr[2] === "(auth/email-already-in-use).")
          return setErrMsg("Email sudah pernah digunakan");
        if (msgErr[2] === "(auth/invalid-email).")
          return setErrMsg("Email tidak valid");
      }

      setModalShow(false);
    }
  };

  useEffect(() => {
    const q = query(userCollection, where("role", "==", "pengajar"), limit(50));
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
    <>
      <AuthComponent>
        {loading ? <LoadingTransparant /> : ""}
        <ModalWrap
          show={modalShow}
          close={() => setModalShow(false)}
          handler={() => submitUserHandler()}
          title="Tambah Pengajar"
          component={
            <>
              <InputForm
                isPassword={false}
                placeholder="Masukan Nama Lengkap"
                val={payload.nama}
                setVal={(v: string) => setPayload({ ...payload, nama: v })}
                icon={<AiOutlineUser />}
              />
              <InputForm
                isPassword={false}
                placeholder="Masukan Email"
                val={payload.email}
                setVal={(v: string) => setPayload({ ...payload, email: v })}
                icon={<AiFillMail />}
              />
              <InputForm
                isPassword={true}
                placeholder="Masukan Password"
                val={payload.password}
                setVal={(v: string) => setPayload({ ...payload, password: v })}
                icon={<AiOutlineLock />}
              />
              <p className="text-[12px] text-red-500 font-[Montserrat]">
                {errMsg}
              </p>
            </>
          }
        />
        <LayoutDas
          menuShow={menuShow}
          setMenuShow={setMenuShow}
          active="Pengaturan"
        >
          <section className="w-full h-full">
            <HeaderDas setMenuShow={setMenuShow} />
            <section className="px-5">
              <TitleHead backto={false} label="Pengajar" />
              <section>
                {data.length > 0
                  ? data.map((item: any) => (
                      <ListUser key={item.id} data={item} />
                    ))
                  : ""}
              </section>
            </section>
          </section>
          <section className=" absolute  z-30 bottom-10 right-[25px]">
            <BtnIcon
              handler={() => setModalShow(true)}
              label={
                <>
                  <span className="text-[30px]">
                    <AiOutlineUserAdd />
                  </span>
                </>
              }
            />
          </section>
        </LayoutDas>
      </AuthComponent>
    </>
  );
}
