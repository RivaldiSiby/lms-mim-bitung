import { primaryColor } from "@/helpers/color";
import { confirmModal } from "@/helpers/modal";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { MdLogout } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import { generateUserData } from "@/helpers/generateUserData";

export default function HeaderDas({ setMenuShow }: { setMenuShow: Function }) {
  const dataAuth: any = useSession();
  const handlerLogout = async () => {
    return Swal.fire({
      title: "Apakah anda Yakin ?",
      text: "Untuk Keluar dari akun ini",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
      }
    });
  };
  return (
    <header className="w-full h-[80px] justify-between flex items-center px-5 py-5 lg:bg-[#F9F9F9] bg-[#7E72F4]">
      <button
        onClick={() => setMenuShow(true)}
        className="lg:hidden block text-white bg-white bg-opacity-20 p-2.5 rounded-lg text-[20px]"
      >
        <FaBars />
      </button>
      <section className="lg:block hidden">
        <p className="text-[14px]">Selamat Datang</p>
        <h4 className="text-[20px] font-bold">
          {" "}
          {dataAuth.data?.user?.name?.nama}
        </h4>
      </section>
      <section className="flex">
        <section className="text-[14px] bg-white border-[rgba(0, 0, 0, 0.11)] h-[45px] flex items-center px-10 rounded-full shadow mr-5">
          {dataAuth.data?.user?.name?.role.toUpperCase()}
        </section>
        <button
          onClick={() => handlerLogout()}
          className="text-[20px] bg-white border-[rgba(0, 0, 0, 0.11)] h-[45px] flex items-center px-5 rounded-full shadow"
        >
          <MdLogout />
        </button>
      </section>
    </header>
  );
}
