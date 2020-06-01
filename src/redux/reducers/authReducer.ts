import { IProfessional } from "../../api/authApi";
import { AuthActions, AUTH_ACTIONS } from "../actions/authActions";

export type AuthStatus =
  | "IDLE"
  | "ESTABLISHING"
  | "FAILED"
  | "UPDATING"
  | "UPDATED"
  | "FINISHED"
  | "EXPIRED";

export interface IAuthStore {
  status: AuthStatus;
  error: Error | null;
  authenticated: boolean;
  token: string | null;
  professional: IProfessional | null;
}

const initialState: IAuthStore = {
  status: "IDLE",
  authenticated: false,
  error: null,
  token: null,
  professional: null,
};

const authReducer = (state: IAuthStore = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTH_ACTIONS.UPDATE_AUTH_STATE:
      const {
        status,
        authenticated,
        token,
        professional,
        error,
      } = action.payload;
      return {
        ...state,
        ...(status && { status }),
        ...(professional !== undefined && { professional }),
        ...(authenticated !== undefined && { authenticated }),
        ...(token !== undefined && { token }),
        ...(error !== undefined && { error }),
      };
    default:
      return state;
  }
};

export { authReducer };
