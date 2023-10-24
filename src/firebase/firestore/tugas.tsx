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
export const tugasCollection = collection(firestoreConfig, "tugas");
export const tugasJoinCollection = collection(firestoreConfig, "tugas_join");

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

export const addTugasJoin = async (payload: any) => {
  try {
    payload.created_at = new Date().getTime();
    payload.updated_at = new Date().getTime();

    const result = await addDoc(tugasJoinCollection, payload);
    return result.id;
  } catch (error) {
    console.log("error user", error);
    throw error;
  }
};

export const getDataTugasByCode = async (code: string) => {
  try {
    const q = query(tugasCollection, where("code", "==", code));
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

export const getTugasJoin = async (id: string) => {
  try {
    const q = query(tugasJoinCollection, where("tugas_id", "==", id));
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

export const getTugas = async (id: string) => {
  try {
    const docRef = doc(firestoreConfig, "tugas", id);
    const result: any = await getDoc(docRef);

    if (!result.exists()) return null;
    return result.data();
  } catch (error) {
    console.log("error data", error);
    throw error;
  }
};

export const postFileTugas = async (id: string, data: any) => {
  try {
    const docRef = doc(firestoreConfig, "tugas_join", id);
    const payloadData = data;
    payloadData.tugas_created_at = new Date().getTime();

    await setDoc(docRef, payloadData);
    return;
  } catch (error) {
    console.log("error data", error);
    throw error;
  }
};
