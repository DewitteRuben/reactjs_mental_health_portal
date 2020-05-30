import { Action, ActionCreator, Dispatch } from "redux";
import { IAuthStore } from "../reducers/authReducer";
import { IRootState } from "../store";
import { auth } from "../../api/authApi";

const AUTH_ACTIONS = {
  UPDATE_AUTH_STATE: "UPDATE_AUTH_STATE",
};

interface IUpdateAuthAction extends Action {
  payload: Partial<IAuthStore>;
}

const updateAuthAction: ActionCreator<IUpdateAuthAction> = (
  payload: Partial<IAuthStore>
) => ({
  payload,
  type: AUTH_ACTIONS.UPDATE_AUTH_STATE,
});

const fetchAuthUser = (email: string, password: string) => async (
  dispatch: Dispatch,
  getState: IRootState
) => {
  dispatch(updateAuthAction({ status: "ESTABLISHING" }));
  try {
    const resp = await auth(email, password);
    const { token, professional } = resp;
    const payload = {
      token,
      authenticated: true,
      status: "FINISHED",
      professional,
    };
    dispatch(updateAuthAction(payload));
  } catch (error) {
    dispatch(updateAuthAction({ status: "FAILED" }));
  }
};

export type AuthActions = IUpdateAuthAction;

export { AUTH_ACTIONS, updateAuthAction, fetchAuthUser };
