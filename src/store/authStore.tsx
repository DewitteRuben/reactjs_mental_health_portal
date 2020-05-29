import React from "react";

interface IAuthStore {
  status: "IDLE" | "REQUESTING" | "AUTHENTICATED";
  authenticated: boolean;
  token: string | null;
}

const initialState: IAuthStore = {
  status: "IDLE",
  authenticated: false,
  token: null,
};

type AuthStoreAction = { type: "UPDATE"; payload: Partial<IAuthStore> };

let reducer = (state: IAuthStore, action: AuthStoreAction) => {
  switch (action.type) {
    case "UPDATE":
      const { status, authenticated, token } = action.payload;
      return {
        ...state,
        ...(status && { status }),
        ...(authenticated !== undefined && { authenticated }),
        ...(token !== undefined && { token }),
      };
    default:
      return state;
  }
};

const AuthContext = React.createContext<{
  state: IAuthStore;
  dispatch: React.Dispatch<AuthStoreAction>;
}>({} as never);

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
