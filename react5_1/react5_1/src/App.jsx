import s from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((loadedData) => {
        setToDoList(loadedData);
        console.log(loadedData);
      });
  }, []);

  const onClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className={s.header}>TODOLIST</div>
      <button className={s.buttonShowAll} onClick={onClick}>
        {isClicked ? "Скрыть задачи" : "Показать еще 20 задач"}
      </button>

      <h5>First 10 tasks are the most important</h5>

      {toDoList.map(({ id, title }) =>
        isClicked ? (
          id >= 0 && id <= 30 ? (
            <div className={s.task} key={id}>
              {id}. {title}
            </div>
          ) : (
            ""
          )
        ) : id >= 0 && id <= 10 ? (
          <div className={s.task} key={id}>
            {id}. {title}
          </div>
        ) : (
          ""
        )
      )}
    </>
  );
}

export default App;
