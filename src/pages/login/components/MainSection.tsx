import InputBox from "@/components/form/InputBox";
import { primaryColor } from "@/helpers/color";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import IndicatorInput from "./IndicatorInput";
import BtnSection from "@/components/form/BtnSection";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function MainSection({ setLoading }: { setLoading: Function }) {
  const router = useRouter();
  const [errMsg, setErr] = useState("");
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const loginHandler = () => {
    setLoading(true);
    setErr("");
    if (payload.email === "" || payload.password === "")
      return setLoading(false);

    const dataPayload = {
      email: payload.email,
      password: payload.password,
      redirect: false,
      callbackUrl: "/dashboard",
    };
    return signIn("credentials", dataPayload)
      .then((res) => {
        console.log("rescheck", res);
        console.log(res?.ok);
        if (!res?.ok) {
          setErr("Email / Password salah");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("error check", err);
        setLoading(false);
      });
  };

  return (
    <div
      style={{ background: primaryColor }}
      className={`flex-1 flex  justify-center items-center lg:rounded-none rounded-t-[50px] py-5`}
    >
      <section className=" sm:w-[80%] w-[90%]">
        <h1 className="font-[Montserrat] text-white font-bold lg:text-[50px] text-[30px] mb-10 lg:mb-20">
          LOGIN
        </h1>
        <InputBox
          placeholder="Masukan Email . . ."
          val={payload.email}
          isPassword={false}
          icon={<FaUser />}
          setVal={(text: string) => setPayload({ ...payload, email: text })}
        />
        <InputBox
          placeholder="Masukan Password . . ."
          val={payload.password}
          isPassword
          icon={<FaLock />}
          setVal={(text: string) => setPayload({ ...payload, password: text })}
        />
        <IndicatorInput
          input1={payload.email.length > 0 ? true : false}
          input2={payload.password.length > 0 ? true : false}
        />
        <p className="text-red-500 font-[Montserrat]">{errMsg}</p>
        <section className="mt-10">
          <BtnSection label="LOGIN" handler={() => loginHandler()} />
        </section>
      </section>
    </div>
  );
}
