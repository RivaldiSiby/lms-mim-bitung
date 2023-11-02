import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Loading from "./Loading";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase/config";
import { getUserData } from "@/firebase/firestore/user";
import { updateProfileUser } from "@/firebase/auth";

export default function RolePengajar({ children, link }: any) {
  const router = useRouter();
  const session: any = useSession();
  if (session.status === "loading") {
    return <Loading />;
  }

  if (session?.data?.user?.name?.role !== "pengajar") {
    return router.push(link);
  }

  return children;
}
