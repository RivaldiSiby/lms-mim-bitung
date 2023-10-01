// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYqg9UMX2jbsvn9b1gNrEIqyKE8fl2P7w",
  authDomain: "lms-mim-project.firebaseapp.com",
  projectId: "lms-mim-project",
  storageBucket: "lms-mim-project.appspot.com",
  messagingSenderId: "51955463158",
  appId: "1:51955463158:web:c4432dcacc9090af700dd7",
  measurementId: "G-XGDQ8T2F3T",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
