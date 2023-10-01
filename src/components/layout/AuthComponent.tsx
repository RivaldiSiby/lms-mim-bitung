import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Loading from "./Loading";

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
