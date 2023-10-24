import { useSession } from "next-auth/react";
import React from "react";

export default function InfoUserLayout() {
  const dataAuth: any = useSession();

  return (
    <section className="lg:hidden block mt-5">
      <p className="text-[14px]">Selamat Datang</p>
      <h4 className="text-[20px] font-bold">
        {dataAuth.data?.user?.name?.nama}
      </h4>
    </section>
  );
}
