import { createContext, PropsWithChildren, useReducer } from "react";

type TAuthContext = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

type User = {
  id: string;
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
};

type AuthState = {
  users: User[];
  me: User
};

export enum AuthActionKind {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type AuthAction = {
  type: AuthActionKind;
  payload: User;
};

function cartReducer(state: AuthState, action: AuthAction) {
  const { type, payload } = action;
  switch (type) {
    case AuthActionKind.REGISTER: {
      const data = [...state.users, {...payload, id: `${state.users.length + 1}`}]
      localStorage.setItem('users', JSON.stringify(data))
      return {
        ...state,
        users: data
      };
    }
  }
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, { users: [], me: null });

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
