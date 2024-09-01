import { useContext } from "react";
import { CartContext } from "../context/cart-context";
import { FormContext } from "@/context/form-context";
import { AuthContext } from "@/context";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw Error("useCart must wrapped with CartProvider");
  }
  return context;
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw Error("useForm must wrapped with FormProvider");
  }
  return context;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw Error("useAuth must wrapped with AuthProvider");
  }
  return context;
};
