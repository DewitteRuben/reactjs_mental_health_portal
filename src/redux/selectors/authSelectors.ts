import { IRootState } from "../store";

const selectAuthenticated = (state: IRootState) => state.auth.authenticated;

const selectProfessionalClients = (state: IRootState) =>
  state.auth.professional?.clients || [];

const selectAuthError = (state: IRootState) => state.auth.error;

export { selectAuthenticated, selectProfessionalClients, selectAuthError };
