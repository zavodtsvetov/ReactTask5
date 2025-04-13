import { ref, remove } from "firebase/database";
import { db } from "../firebase";
export const deleteTask = (setIsDeleted) => {
  const dbRef = ref(db, "todos/1");
  remove(dbRef);
  setIsDeleted(true);
};
