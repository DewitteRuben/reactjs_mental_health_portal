import { request, createAuthHeader } from ".";

const registerClient = (token: string) => (
  email: string,
  firstName: string,
  lastName: string,
  birthDate: Date
) => {
  return request("/user", {
    method: "POST",
    body: JSON.stringify({ email, firstName, lastName, birthDate }),
    ...createAuthHeader(token),
  });
};

const removeClient = (token: string) => (userId: string) => {
  return request("/user", {
    method: "DELETE",
    body: JSON.stringify({ userId }),
    ...createAuthHeader(token),
  });
};

export { registerClient, removeClient };
