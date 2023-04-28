import { initializeApp } from "firebase/app"
import { getFirestore,collection } from "firebase/firestore"
import env from "react-dotenv";


const firebaseApp = initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: "reactfirebase2-91017.firebaseapp.com",
  projectId: "reactfirebase2-91017",
  storageBucket: "reactfirebase2-91017.appspot.com",
  messagingSenderId: "746522492000",
  appId: "1:746522492000:web:a64900b55b3b9de9235705",
  measurementId: "G-M84WD8YKL3"
  });

export const db = getFirestore(firebaseApp);

export const userCollections = collection(db, "users");
export const billsCollections = collection(db, "bills");
export const clientsCollections = collection(db, "clients");



