import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "../config";

const firestoreConfig = getFirestore(app);
export const materiCollection = collection(firestoreConfig, "materi");

export const addMateri = async (payload: any) => {
  try {
    payload.created_at = new Date().getTime();
    payload.updated_at = new Date().getTime();

    const result = await addDoc(materiCollection, payload);
    return result.id;
  } catch (error) {
    console.log("error user", error);
    throw error;
  }
};

export const getDataMateri = async () => {
  try {
    const q = query(materiCollection, orderBy("created_at", "desc"));
    const result = await getDocs(q);
    if (result.docs.length === 0) return [];
    let data: any = [];
    result.docs.forEach((doc: any) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  } catch (error) {
    console.log("error data", error);
    throw error;
  }
};
