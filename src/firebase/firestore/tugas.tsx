import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../config";

const firestoreConfig = getFirestore(app);
export const tugasCollection = collection(firestoreConfig, "tugas");

export const addTugas = async (payload: any) => {
  try {
    payload.created_at = new Date().getTime();
    payload.updated_at = new Date().getTime();

    const result = await addDoc(tugasCollection, payload);
    return result.id;
  } catch (error) {
    console.log("error user", error);
    throw error;
  }
};
