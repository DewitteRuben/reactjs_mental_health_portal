import { IRootState } from "../store";

const selectAuthenticated = (state: IRootState) => state.auth.authenticated;

const selectProfessionalClients = (state: IRootState) =>
  state.auth.professional?.clients || [];

const selectAuthError = (state: IRootState) => state.auth.error;

const selectAuthStatus = (state: IRootState) => state.auth.status;

const selectClientById = (userId: string) => (state: IRootState) =>
  state.auth.professional?.clients.filter(
    (client) => client.userId === userId
  )[0];

export {
  selectAuthenticated,
  selectProfessionalClients,
  selectAuthError,
  selectAuthStatus,
  selectClientById,
};
