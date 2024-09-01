import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const COLOR = {
  primary: "border-2 border-yellow-400 bg-yellow-400 text-dark-400 ",
  "primary-outline":
    "border-2 bg-[transparent] border-yellow-400 text-dark-400 ",
  secondary: "border-2 border-brown-400 bg-brown-400 text-white",
  "secondary-outline": "border-2 border-brown-400 bg-[transparent] text-dark",
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

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    color?: keyof typeof COLOR;
    size?: keyof typeof SIZE;
    rounded?: keyof typeof ROUNDED;
    isLoading?: boolean;
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
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={twMerge(
        "font-medium outline-none shadow-none transition-all duration-300 hover:opacity-50",
        COLOR[color],
        SIZE[size],
        ROUNDED[rounded],
        disabled && "!opacity-50 !cursor-auto",
        isLoading && "!opacity-50 !cursor-auto",
        className,
      )}
      {...props}
      onClick={disabled ? () => null : props.onClick}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
