import { request } from ".";

interface IProfessional {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthDate: Date;
}

const auth = (email: string, password: string) => {
  return request("/auth/professional", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

const registerProfessional = (credentials: IProfessional) => {
  return request("/professional", {
    method: "POST",
    body: JSON.stringify({ ...credentials }),
  });
};

export { auth, registerProfessional };
