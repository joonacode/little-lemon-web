import { createContext, PropsWithChildren, useReducer } from "react";

type TCartContext = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

export const CartContext = createContext<TCartContext | undefined>(undefined);

type Cart = {
  id: string;
  amount: number;
};

type CartState = {
  carts: Cart[];
};

export enum CartActionKind {
  ADD = "ADD",
  REMOVE = "REMOVE",
  QTY_PLUS = "QTY_PLUS",
  QTY_MIN = "QTY_MIN",
}

type CartAction = {
  type: CartActionKind;
  payload: Cart;
};

function cartReducer(state: CartState, action: CartAction) {
  const { type, payload } = action;
  switch (type) {
    case CartActionKind.ADD: {
      const dataEdited = state.carts.map((cart) => {
        if (cart.id === payload.id) {
          return {
            ...cart,
            amount: (cart.amount += 1),
          };
        }
        return cart;
      });
      return {
        ...state,
        carts: state.carts.find((x) => x.id === payload.id)
          ? dataEdited
          : [...state.carts, payload],
      };
    }
  }
}

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, { carts: [] });

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
