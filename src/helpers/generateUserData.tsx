import { app } from "@/firebase/config";
import { getAuth } from "firebase/auth";

export const generateUserData = () => {
  const user: any = getAuth(app).currentUser;
  if (user) {
    const datauser = JSON.parse(user?.displayName);
    console.log(datauser);
    return datauser;
  }
  return {
    created_at: "",
    email: "",
    id: "",
    nama: "",
    role: "",
    updated_at: "",
  };
};
