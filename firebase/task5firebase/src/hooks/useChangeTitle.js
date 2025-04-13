export const useChangeTitle = (onClick) => {
  fetch("http://localhost:3015/todos/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      userId: 1,
      title: "Купить чипсы",
      completed: false,
    }),
  })
    .then((rawResp) => rawResp.json())
    .then(() => onClick());
};
