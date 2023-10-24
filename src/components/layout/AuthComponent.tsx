import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Loading from "./Loading";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase/config";
import { getUserData } from "@/firebase/firestore/user";
import { updateProfileUser } from "@/firebase/auth";

export default function AuthComponent({ children }: any) {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      console.log("session is over");
      router.push("/login");
    },
  });

  if (session.status === "loading") {
    return <Loading />;
  }

  return children;
}
