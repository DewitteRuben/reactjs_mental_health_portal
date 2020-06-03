import { request, createAuthHeader } from ".";

const getTasks = (token: string) => {
  return request("/task", { ...createAuthHeader(token) });
};

const addTask = (token: string) => (
  title: string,
  description: string,
  userId: string
) => {
  return request("/task", {
    method: "POST",
    ...createAuthHeader(token),
    body: JSON.stringify({ title, description, userId }),
  });
};

export { getTasks, addTask };
