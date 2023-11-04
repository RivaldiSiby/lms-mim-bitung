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
export const quizJoinCollection = collection(firestoreConfig, "quiz_join");

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

export const addQuizJoin = async (payload: any) => {
  try {
    payload.created_at = new Date().getTime();
    payload.updated_at = new Date().getTime();

    const result = await addDoc(quizJoinCollection, payload);
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
export const updateQuiz = async (id: string, payload: any) => {
  try {
    const docRef = doc(firestoreConfig, "quiz", id);
    const result: any = await setDoc(docRef, payload);

    return;
  } catch (error) {
    console.log("error data", error);
    throw error;
  }
};

export const getDataQuizByCode = async (code: string) => {
  try {
    const q = query(quizCollection, where("kode", "==", code));
    const result = await getDocs(q);
    if (result.docs.length === 0) return false;
    let data;
    result.docs.forEach((doc: any) => {
      data = { ...doc.data(), id: doc.id };
    });
    return data;
  } catch (error) {
    console.log("error data", error);
    throw error;
  }
};

export const getQuizJoin = async (id: string, userId: string) => {
  try {
    const q = query(
      quizJoinCollection,
      where("user_created", "==", userId),
      where("quiz_id", "==", id)
    );
    const result = await getDocs(q);
    if (result.docs.length === 0) return false;
    let data;
    result.docs.forEach((doc: any) => {
      data = { ...doc.data(), id: doc.id };
    });
    return data;
  } catch (error) {
    console.log("error data", error);
    throw error;
  }
};
