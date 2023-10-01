import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);
  return <div className="w-full h-full bg-white">Project lms Mim Bitung</div>;
}
