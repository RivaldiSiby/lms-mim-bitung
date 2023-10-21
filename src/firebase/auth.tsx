import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "./config";

const auth: any = getAuth(app);

export const createUser = async (payload: any) => {
  try {
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

export const updateProfileUser = async (payload: any) => {
  try {
    await updateProfile(auth.currentUser, payload);
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
