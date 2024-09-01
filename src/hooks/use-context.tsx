import { useContext } from "react";
import { AuthContext, CartContext, FormContext, ToastContext } from "@/context";

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

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw Error("useToast must wrapped with ToastProvider");
  }
  return context;
};
