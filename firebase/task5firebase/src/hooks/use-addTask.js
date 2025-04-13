import { ref, push } from "firebase/database";
import { db } from "../firebase";
export const useAdd = () => {
  const todosDBRef = ref(db, "todos");
  push(todosDBRef, {
    userId: "4",
    title: "Кодить",
    completed: false,
  });
};
