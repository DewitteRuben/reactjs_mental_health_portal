import { Action, ActionCreator, Dispatch } from "redux";
import { IAuthStore } from "../reducers/authReducer";
import { IRootState } from "../store";
import { auth, refreshToken } from "../../api/authApi";
import { registerClient, removeClient } from "../../api/professionalApi";
import jwtDecode from "jwt-decode";
import _ from "lodash";

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

const checkToken = async (
  dispatch: Dispatch,
  getState: () => IRootState
): Promise<{ valid: boolean; message: string; token: string }> => {
  return new Promise(async (resolve, reject) => {
    const { token } = getState().auth;

    if (!token)
      return reject({ message: "Token is invalid or missing.", valid: false });

    const { exp } = await jwtDecode(token);

    if (Date.now() + 10000 < exp)
      return resolve({ message: "Token is still valid.", token, valid: true });

    try {
      dispatch(updateAuthAction({ status: "ESTABLISHING" }));
      const { token } = await refreshToken();
      const payload = {
        token,
        authenticated: true,
        status: "FINISHED",
      };
      dispatch(updateAuthAction(payload));
      return resolve({
        message: "Successfully refreshed token",
        token,
        valid: true,
      });
    } catch (error) {
      dispatch(
        updateAuthAction({
          token: null,
          authenticated: false,
          status: "EXPIRED",
        })
      );
      return reject({
        message: "The refresh token has expired. Logging out.",
        valid: false,
      });
    }
  });
};

const fetchOrUpdateToken = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    dispatch(updateAuthAction({ status: "ESTABLISHING" }));
    const { token, professional } = await refreshToken();
    const payload = {
      token,
      professional,
      authenticated: true,
      status: "FINISHED",
    };
    dispatch(updateAuthAction(payload));
  } catch (error) {
    // do nothing
  }
};

const fetchDeleteClient = (userId: string) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  dispatch(updateAuthAction({ status: "UPDATING" }));

  const { token } = await checkToken(dispatch, getState);

  try {
    await removeClient(token)(userId);

    const professional = _.cloneDeep(getState().auth.professional);

    if (!professional) throw new Error("Unauthorized");

    const updatedClients = professional?.clients.filter(
      (client) => client.userId !== userId
    );

    professional.clients = updatedClients;

    dispatch(updateAuthAction({ professional }));
  } catch (error) {
    dispatch(updateAuthAction({ status: "FAILED", error }));
  }
};

const fetchAddClientToProfessional = (
  email: string,
  firstName: string,
  lastName: string,
  birthDate: Date
) => async (dispatch: Dispatch, getState: () => IRootState) => {
  dispatch(updateAuthAction({ status: "UPDATING" }));
  try {
    const { token } = await checkToken(dispatch, getState);

    const { professional } = await registerClient(token)(
      email,
      firstName,
      lastName,
      birthDate
    );

    dispatch(updateAuthAction({ professional, status: "UPDATED" }));
  } catch (error) {
    dispatch(updateAuthAction({ status: "FAILED", error }));
  }
};

const fetchAuthUser = (email: string, password: string) => async (
  dispatch: Dispatch
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
    dispatch(updateAuthAction({ status: "FAILED", error }));
  }
};

export type AuthActions = IUpdateAuthAction;

export {
  AUTH_ACTIONS,
  updateAuthAction,
  fetchAuthUser,
  fetchAddClientToProfessional,
  fetchDeleteClient,
  fetchOrUpdateToken,
  checkToken,
};
