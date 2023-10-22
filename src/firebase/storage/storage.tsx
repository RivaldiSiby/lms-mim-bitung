import {
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { app } from "../config";

const firebaseStorage = getStorage(app);

export const HandlerFileMateri = async (file: any) => {
  try {
    const datenow = new Date().getTime();
    console.log(file);
    let filename = file.name;
    let storageRef = ref(firebaseStorage, `/materi/${datenow + filename}`);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const downloadFileStorage = async (url: string) => {
  try {
    let storageRef = ref(firebaseStorage, url);
    console.log(url);
    await getBlob(storageRef);
  } catch (error) {
    throw error;
  }
};
