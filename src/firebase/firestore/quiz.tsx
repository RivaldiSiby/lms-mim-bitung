import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../config";

const firestoreConfig = getFirestore(app);
export const quizCollection = collection(firestoreConfig, "quiz");
export const quizTaskCollection = collection(firestoreConfig, "quiz_task");
export const tugasJoinCollection = collection(firestoreConfig, "tugas_join");

export const addQuiz = async (payload: any) => {
  try {
    payload.created_at = new Date().getTime();
    payload.updated_at = new Date().getTime();

    const result = await addDoc(quizCollection, payload);
    return result.id;
  } catch (error) {
    console.log("error user", error);
    throw error;
  }
};
export const addQuizTask = async (payload: any) => {
  try {
    payload.created_at = new Date().getTime();
    payload.updated_at = new Date().getTime();

    const result = await addDoc(quizTaskCollection, payload);
    return result.id;
  } catch (error) {
    console.log("error user", error);
    throw error;
  }
};

export const getQuiz = async (id: string) => {
  try {
    const docRef = doc(firestoreConfig, "quiz", id);
    const result: any = await getDoc(docRef);

    if (!result.exists()) return null;
    return result.data();
  } catch (error) {
    console.log("error data", error);
    throw error;
  }
};
