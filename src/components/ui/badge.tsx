import { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const COLOR = {
  primary: "bg-brown-400/80 text-white",
  secondary: "bg-yellow-200 text-dark-400",
};

const ROUNDED = {
  sm: "rounded-[6px]",
  base: "rounded-[12px]",
  full: "rounded-full"
};

const SIZE = {
  base: "text-sm px-3 py-1",
};

type Props = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    className?: string;
    color?: keyof typeof COLOR;
    size?: keyof typeof SIZE;
    rounded?: keyof typeof ROUNDED;
  }
>;

export const Badge = ({
  className = "",
  color = "primary",
  size = "base",
  rounded = "full",
  children,
  ...props
}: Props) => {
  return (
    <div
      className={twMerge(
        "font-medium outline-none cursor-pointer shadow-none transition-all duration-300 hover:opacity-50",
        COLOR[color],
        SIZE[size],
        ROUNDED[rounded],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
