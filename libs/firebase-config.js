// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3T757PsXTRV6Lo4_FmIw6VwRfwAb7geg",
  authDomain: "athormax-841f3.firebaseapp.com",
  projectId: "athormax-841f3",
  storageBucket: "athormax-841f3.appspot.com",
  messagingSenderId: "1024621112751",
  appId: "1:1024621112751:web:5d4adba5dd4963d1df135a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
