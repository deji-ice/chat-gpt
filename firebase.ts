import { getFirestore, collection, getDocs } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { getApp,getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig1 = {
  apiKey: "AIzaSyB5mDL1MIQtXwBYA5qOTfJZYmypYdrOIpM",
  authDomain: "chatgpt-clone-17c03.firebaseapp.com",
  projectId: "chatgpt-clone-17c03",
  storageBucket: "chatgpt-clone-17c03.appspot.com",
  messagingSenderId: "860300145958",
  appId: "1:860300145958:web:9bbb6c35d7374f1e197de7"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig1, "app1");
const db = getFirestore(app)

export { db }