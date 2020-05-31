import { request } from ".";

interface INewProfessional {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthDate: Date;
}

export interface IClient {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface IProfessional extends INewProfessional {
  clients: IClient[];
}

const auth = (email: string, password: string) => {
  return request("/auth/professional", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

const refreshToken = () => {
  return request("/auth/professional/refresh", {
    method: "POST",
    credentials: "include",
  });
};

const registerProfessional = (credentials: INewProfessional) => {
  return request("/professional", {
    method: "POST",
    body: JSON.stringify({ ...credentials }),
  });
};

export { auth, registerProfessional, refreshToken };
