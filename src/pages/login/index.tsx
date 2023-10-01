import React, { useEffect, useState } from "react";
import MainSection from "./components/MainSection";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "@/components/layout/Loading";

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const session = useSession({
    required: false,
    onUnauthenticated() {
      console.log("sudah login");
    },
  });

  useEffect(() => {
    const check = () => {
      if (session.status === "authenticated") {
        router.push("/dashboard");
      }
    };

    return check();
  }, [session]);
  return (
    <>
      {session.status === "loading" || isLoading ? <Loading /> : ""}
      <main className="bg-white h-full w-full flex min-h-[100vh] lg:flex-row flex-col">
        <section className="flex-1 border justify-center items-center flex ">
          <img src="/img/bgauth.png" alt="bgauth" className="w-[80%]" />
        </section>
        <MainSection setLoading={setLoading} />
      </main>
    </>
  );
}
