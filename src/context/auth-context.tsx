/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useEffect, useReducer } from "react";

type TAuthContext = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

type AuthState = {
  users: User[];
  me: User;
};

export enum AuthActionKind {
  REGISTER = "REGISTER",
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type AuthAction = {
  type: AuthActionKind;
  payload: any;
};

function cartReducer(state: AuthState, action: AuthAction) {
  const { type, payload } = action;
  switch (type) {
    case AuthActionKind.REGISTER: {
      const data = [
        ...state.users,
        { ...payload, id: `${state.users.length + 1}` },
      ];
      localStorage.setItem("users", JSON.stringify(data));
      return {
        ...state,
        users: data,
      };
    }
    case AuthActionKind.LOGIN: {
      const me = state.users.find(x => x.email === payload.email)
      localStorage.setItem("me", JSON.stringify(me));
      return {
        ...state,
        me,
      };
    }
    case AuthActionKind.INITIAL: {
      return {
        ...state,
        ...payload,
      };
    }
  }
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, { users: [], me: null });
  useEffect(() => {
    try {
      const users = localStorage.getItem("users");
      const me = localStorage.getItem("me");
      let parsedUsers = [];
      let parsedMe = undefined
      if (users) {
        parsedUsers = JSON.parse(users);
      }

      if (me) {
        parsedMe = JSON.parse(me);
      }

      dispatch({
        type: AuthActionKind.INITIAL,
        payload: { users: parsedUsers, me: parsedMe },
      });
    } catch(e) {
      console.log('x',e )
      dispatch({
        type: AuthActionKind.INITIAL,
        payload: { users: [], me: undefined },
      });
    }
  }, []);

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
