export const deleteTask = (onClick, setIsDeleted) => {
  fetch("http://localhost:3015/todos/2", {
    method: "DELETE",
  }).then((rawResp) => rawResp.json());
  onClick();
  setIsDeleted(true);
};
