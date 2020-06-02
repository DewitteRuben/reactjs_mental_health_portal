import { request, createAuthHeader } from ".";

const authUser = (userId: string) => {
  return request("/auth/user", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
};

const getMoodEntries = (token: string) => {
  return request("/moodentry", { ...createAuthHeader(token) });
};

export { authUser, getMoodEntries };
