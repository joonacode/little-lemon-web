import { ElementType, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = PropsWithChildren<{
  className?: string;
  as?: ElementType;
  [key: string]: any
}>;

export const Container = ({ className, as = "div", children, ...props }: Props) => {
  const As = as;
  return <As className={twMerge("max-w-[1280px] mx-auto px-4", className)} {...props}>{children}</As>;
};
