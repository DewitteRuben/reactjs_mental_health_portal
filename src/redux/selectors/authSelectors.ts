import { IRootState } from "../store";

const selectAuthenticated = (state: IRootState) => state.auth.authenticated;

const selectProfessionalClients = (state: IRootState) =>
  state.auth.professional?.clients || [];

export { selectAuthenticated, selectProfessionalClients };
