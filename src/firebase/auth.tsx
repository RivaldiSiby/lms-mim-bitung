import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "./config";

export const createUser = async (payload: any) => {
  try {
    const auth = getAuth(app);
    const userRegis = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return userRegis.user;
  } catch (error) {
    throw error;
  }
};
