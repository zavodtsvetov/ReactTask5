import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC0xlBh-gJregKmVUmz9P7FU0Bs_uo7ELA",
  authDomain: "task5-3.firebaseapp.com",
  projectId: "task5-3",
  storageBucket: "task5-3.firebasestorage.app",
  messagingSenderId: "243107459459",
  appId: "1:243107459459:web:235f7fa486aa325fc6c6b6",
  databaseURL:
    "https://task5-3-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
