/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

interface IFormContext {
  formState: {
    values: any;
    errors: any;
  };
  setValue: (k: any, value: any) => void;
  getValue: (k: any) => void;
  onChange: (k: any) => void;
  onBlur: (k: any) => void;
}
export const FormContext = createContext<IFormContext | undefined>(undefined);

interface FormProviderProps extends IFormContext {
  children: any;
}

export const FormProvider = ({ children, ...rest }: FormProviderProps) => {
  return (
    <FormContext.Provider value={{ ...rest }}>{children}</FormContext.Provider>
  );
};
