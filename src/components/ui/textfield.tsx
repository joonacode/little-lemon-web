import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color"> & {
  className?: string;
  name: string;
  label?: string;
  isError?: boolean;
};

export const Textfield = ({
  className = "",
  type = "text",
  label,
  name,
  isError,
  ...props
}: Props) => {
  return (
    <div>
      {label && (
        <label className="block mb-1" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        className={twMerge(
          "outline-none border border-dark-200/20 focus:border-dark-200 text-sm px-4 py-3 w-full rounded-xl bg-[transparent]",
          isError && "border-[red]/50",
          className,
        )}
        {...props}
        // onBlur={() => console.log('x')}
      />
    </div>
  );
};
