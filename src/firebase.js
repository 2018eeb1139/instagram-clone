// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOwsa4NT8gVTVmA4P1kagAy1RoPmrWFmo",
  authDomain: "instagram-clone-df230.firebaseapp.com",
  projectId: "instagram-clone-df230",
  storageBucket: "instagram-clone-df230.appspot.com",
  messagingSenderId: "528631141562",
  appId: "1:528631141562:web:2b8624180863b9ec07de83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { db, auth, storage };
