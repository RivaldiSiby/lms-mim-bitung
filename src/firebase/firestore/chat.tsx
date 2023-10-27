import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../config";

const firestoreConfig = getFirestore(app);
export const chatCollection = collection(firestoreConfig, "chat");

export const addChat = async (payload: any) => {
  try {
    payload.created_at = new Date().getTime();
    payload.updated_at = new Date().getTime();

    const result = await addDoc(chatCollection, payload);
    return result.id;
  } catch (error) {
    console.log("error user", error);
    throw error;
  }
};
