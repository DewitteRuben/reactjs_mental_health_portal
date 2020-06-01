import { IRootState } from "../store";

const selectAuthenticated = (state: IRootState) => state.auth.authenticated;

const selectProfessionalClients = (state: IRootState) =>
  state.auth.professional?.clients || [];

const selectAuthError = (state: IRootState) => state.auth.error;

const selectAuthStatus = (state: IRootState) => state.auth.status;

export {
  selectAuthenticated,
  selectProfessionalClients,
  selectAuthError,
  selectAuthStatus,
};
