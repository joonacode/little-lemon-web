/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "@/hooks/use-context";
import React from "react";

// Define FieldProps with the correct typing
type FieldProps<T extends keyof JSX.IntrinsicElements | React.ComponentType<any>> = {
  component: T;
  wrapperClassName?: string
} & Omit<
  T extends keyof JSX.IntrinsicElements
    ? React.ComponentProps<T>
    : React.ComponentProps<T>,
  "ref"
>;

export const Field = <T extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
  props: FieldProps<T>,
) => {
  const { onChange, onBlur, formState } = useForm();
  const { component: Component, ...others } = props;

  const isError = () => {
    const status = formState.errors[others.name];
    return Boolean(status);
  };

  // Ensure correct props typing by inferring them from the component
  const componentProps = {
    ...others,
    isError: isError(),
    onChange,
    onBlur,
    value: formState.values[props.name] ?? ""
  } as React.ComponentProps<T>;

  return (
    <div className={props.wrapperClassName}>
      <Component {...componentProps} />
      {formState.errors[others.name] && (
        <p  className="mt-1 text-[red]/80 text-xs">
          {formState.errors[others.name].join(", ")}
        </p>
      )}
    </div>
  );
};
