// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7-9g2f4AIc3PjqTeR0UZ9GF1PrrH-iHM",
  authDomain: "module-50-fb916.firebaseapp.com",
  projectId: "module-50-fb916",
  storageBucket: "module-50-fb916.appspot.com",
  messagingSenderId: "542561504183",
  appId: "1:542561504183:web:77efe5f5b59e20928f7632"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;