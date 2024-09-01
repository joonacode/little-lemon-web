import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const COLOR = {
  primary: "bg-yellow-400 text-dark-400 ",
  secondary: "bg-brown-400 text-white",
};

const ROUNDED = {
  sm: "rounded-[6px]",
  base: "rounded-[12px]",
};

const SIZE = {
  sm: "text-sm px-4 py-2",
  base: "text-base px-4 py-2",
  lg: "text-base px-5 py-3",
  xl: "text-lg px-5 py-3",
};

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    color?: keyof typeof COLOR;
    size?: keyof typeof SIZE;
    rounded?: keyof typeof ROUNDED;
  }
>;

export const Button = ({
  className = "",
  type = "button",
  color = "primary",
  size = "base",
  rounded = "base",
  children,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      type={type}
      className={twMerge(
        "font-medium outline-none shadow-none transition-all duration-300 hover:opacity-50",
        COLOR[color],
        SIZE[size],
        ROUNDED[rounded],
        disabled && '!opacity-50 !cursor-auto',
        className,
      )}
      {...props}
      onClick={disabled ? () => null : props.onClick}
    >
      {children}
    </button>
  );
};
