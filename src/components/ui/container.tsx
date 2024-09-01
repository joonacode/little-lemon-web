import { ElementType, forwardRef, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = PropsWithChildren<{
  className?: string;
  as?: ElementType;
  [key: string]: any;
}>;

export const Container = forwardRef(
  ({ className, as = "div", children, ...props }: Props, ref) => {
    const As = as;
    return (
      <As
        ref={ref}
        className={twMerge("max-w-[1300px] mx-auto px-8", className)}
        {...props}
      >
        {children}
      </As>
    );
  },
);
