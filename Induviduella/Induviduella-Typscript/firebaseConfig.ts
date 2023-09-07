

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw40e8iSuZso7McyI2SySO05nTqff1iCY",
  authDomain: "web-shop-ts.firebaseapp.com",
  databaseURL: "https://web-shop-ts-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "web-shop-ts",
  storageBucket: "web-shop-ts.appspot.com",
  messagingSenderId: "550967165719",
  appId: "1:550967165719:web:d34f97f2dcdd7fd0a0ed52",
  measurementId: "G-8BEFCB243G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default getFirestore(app);