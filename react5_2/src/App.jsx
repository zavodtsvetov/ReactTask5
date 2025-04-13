import s from "./App.module.css";
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
    fetch("http://localhost:3015/todos")
      .then((res) => res.json())
      .then((loadedData) => {
        setToDoList(loadedData);
      });
  }, [isClicked]);

  const useAddTask = () => {
    useAdd(onClick);
  };

  const useChangeTodoTitle = () => {
    useChangeTitle(onClick);
  };

  const useDeleteTitle = () => {
    deleteTask(onClick, setIsDeleted);
  };

  const onInputChange = ({ target }) => {
    setInputValue(target.value);
    toDoList.forEach((task) => {
      if (target.value.trim() === task.title) {
        console.log(task.id);
        setCurrentTask(task.id);
        refButton.current.focus();
      }
    });
  };
  const refButton = useRef(null);
  const onSubmit = (event) => {
    event.preventDefault();
    if (currentTask) {
      alert(`Номер вашего таска: ${currentTask}`);
    } else {
      alert("Перепроверьте ввод");
    }
  };

  const sorted = [...toDoList];
  const onHandleSort = () => {
    sorted.sort((a, b) => (a.title > b.title ? 1 : -1));
    setToDoList(sorted);
    setIsSorted(true);
  };

  return (
    <>
      <div className={s.header}>TODOLIST 2.0</div>
      <p>
        with{" "}
        <span style={{ textDecoration: "line-through" }}>JASON STATHAM</span>{" "}
        JSON SERVER
      </p>
      <form onSubmit={onSubmit}>
        <input
          className={s.inputTask}
          onChange={onInputChange}
          type="text"
          name="search"
          placeholder="Поиск задачи..."
        />{" "}
        <button ref={refButton} style={{ border: "none" }} type="submit">
          {" "}
          🔍
        </button>
      </form>
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
        {isDeleted ? "Пробежка отменена" : "Отменить пробежку"}{" "}
      </button>
      <br />

      <button
        disabled={isSorted ? true : false}
        onClick={onHandleSort}
        className={isSorted ? s.sortedButton : s.buttonShowAll}
      >
        {isSorted ? "Отсортировано" : "Сортировать по алфавиту"}
      </button>

      <h5>Второе задание.</h5>

      {toDoList.map(({ id, title }) => (
        <div key={id}>
          {id}. {title}
        </div>
      ))}
    </>
  );
}

export default App;
