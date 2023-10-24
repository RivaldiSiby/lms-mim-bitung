import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../config";

const firestoreConfig = getFirestore(app);
export const userCollection = collection(firestoreConfig, "user");

export const addUser = async (payload: any) => {
  try {
    payload.created_at = new Date().getTime();
    payload.updated_at = new Date().getTime();

    const result = await addDoc(userCollection, payload);
    return result.id;
  } catch (error) {
    console.log("error user", error);
    throw error;
  }
};

export const getUserData = async (email: string) => {
  try {
    const q = query(userCollection, where("email", "==", email));
    const result = await getDocs(q);
    let data;
    result.docs.forEach((doc: any) => {
      data = { ...doc.data(), id: doc.id };
    });
    return data;
  } catch (error) {
    console.log("error user", error);
    throw error;
  }
};
