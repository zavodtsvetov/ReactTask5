import s from "./App.module.css";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { useState, useEffect, useRef } from "react";
import { useChangeTitle, useAdd, deleteTask } from "./hooks/index";
function App() {
  const [toDoList, setToDoList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const onClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const todosDBRef = ref(db, "todos");
    return onValue(todosDBRef, (snapshot) => {
      const loadedTodos = snapshot.val() || [];
      setToDoList(loadedTodos);
    });
  });

  const useAddTask = () => {
    useAdd();
  };

  const useChangeTodoTitle = () => {
    useChangeTitle();
  };

  const useDeleteTitle = () => {
    deleteTask(setIsDeleted);
  };

  const sorted = toDoList;
  const onHandleSort = () => {
    sorted.sort((a, b) => (a.title > b.title ? 1 : -1));
    setToDoList(sorted);
    setIsSorted(true);
  };

  return (
    <>
      <div className={s.header}>TODOLIST with FireBase</div>
      <br />
      <button onClick={useAddTask} className={s.buttonShowAll}>
        Добавить дело
      </button>
      <br />
      <button onClick={useChangeTodoTitle} className={s.buttonShowAll}>
        Напомнить, что хотел купить
      </button>
      <br />
      <button
        disabled={isDeleted}
        onClick={useDeleteTitle}
        className={isDeleted ? s.sortedButton : s.buttonShowAll}
      >
        {isDeleted ? "Прокрастинация отменена" : "Отменить лень"}
      </button>
      <br />

      <button
        disabled={isSorted ? true : false}
        onClick={onHandleSort}
        className={isSorted ? s.sortedButton : s.buttonShowAll}
      >
        {isSorted ? "Отсортировано" : "Сортировать по алфавиту"}
      </button>

      <h5>Третий список дел: </h5>

      {Object.entries(toDoList).map(([id, { title }]) => (
        <div key={id}> {title}</div>
      ))}
    </>
  );
}

export default App;
