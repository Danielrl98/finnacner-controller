import { initializeApp } from "firebase/app"
import { useSelector } from "react-redux"
import { getFirestore,collection } from "firebase/firestore"

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAK0Iq6dOlxBADyRl7GnlARj5u84_ESNgo",
    authDomain: "reactfirebase-89132.firebaseapp.com",
    projectId: "reactfirebase-89132",
  });

const db = getFirestore(firebaseApp);

export const userCollections = collection(db, "users");



