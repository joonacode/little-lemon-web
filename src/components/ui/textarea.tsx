import { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "color"> & {
  className?: string;
  name: string;
  label?: string;
  isError?: boolean;
};

export const Textarea = ({
  className = "",
  label,
  name,
  ...props
}: Props) => {
  return (
    <div>
      {label && <label className="block mb-1" htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        rows={4}
        className={twMerge(
          "outline-none border border-dark-200/20 focus:border-dark-200 text-sm px-4 py-3 w-full rounded-xl bg-[transparent]",
          props.isError && "border-[red]/50",
          className,
        )}
        {...props}
      />
    </div>
  );
};
