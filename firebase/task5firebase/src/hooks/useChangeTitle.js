import { ref, set } from "firebase/database";
import { db } from "../firebase";
export const useChangeTitle = () => {
  const todosDBRef = ref(db, "todos/2");
  set(todosDBRef, {
    userId: 1,
    title: "Купить чипсы",
    completed: false,
  });
};
