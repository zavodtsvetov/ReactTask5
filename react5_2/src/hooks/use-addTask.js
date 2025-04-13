export const useAdd = (onClick) => {
  fetch("http://localhost:3015/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      userId: "3",
      title: "Кодить",
      completed: false,
    }),
  })
    .then((rawResp) => rawResp.json())
    .then(() => onClick());
};
