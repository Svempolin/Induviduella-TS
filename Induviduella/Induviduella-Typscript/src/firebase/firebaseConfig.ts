


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


 export const firebaseConfig = {
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
console.log(firebaseConfig);


const db = getFirestore(app);


export { db,app };
