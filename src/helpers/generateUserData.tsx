import { getSession, useSession } from "next-auth/react";
import React from "react";

export default async function generateUserData() {
  const session = await getSession();
  console.log("get session", session);
  return session?.user?.name;
}
