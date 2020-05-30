import { IProfessional } from "../../api/authApi";
import { AuthActions, AUTH_ACTIONS } from "../actions/authActions";

export interface IAuthStore {
  status: "IDLE" | "ESTABLISHING" | "FAILED" | "FINISHED";
  authenticated: boolean;
  token: string | null;
  professional: IProfessional | null;
}

const initialState: IAuthStore = {
  status: "IDLE",
  authenticated: false,
  token: null,
  professional: null,
};

const authReducer = (state: IAuthStore = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTH_ACTIONS.UPDATE_AUTH_STATE:
      const { status, authenticated, token, professional } = action.payload;
      return {
        ...state,
        ...(status && { status }),
        ...(professional !== undefined && { professional }),
        ...(authenticated !== undefined && { authenticated }),
        ...(token !== undefined && { token }),
      };
    default:
      return state;
  }
};

export { authReducer };
