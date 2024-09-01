import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Image } from "./image";
import { IC_X } from "@/assets";

const STATUS = {
  error: "bg-white border-2 border-[red]/20 text-[red]",
  success: "bg-white border-2 border-[green]/20 text-[green]",
  info: "bg-[blue]/20 border-2 border-[blue]/20 text-dark-300",
};

export interface ToastCardProps extends React.ComponentProps<"div"> {
  className?: string;
  title: string;
  status?: keyof typeof STATUS;
  description?: string;
  withIcon?: boolean;
  closable?: boolean;
  onClick?: () => void;
}

const ToastCard: React.FC<ToastCardProps> = (props) => {
  const {
    className,
    title,
    status = "info",
    description,
    closable,
    onClick,
    ...styles
  } = props;
  const [isShow, setIsShow] = useState(true);

  return isShow ? (
    <div
      className={twMerge(
        "w-full px-4 py-3 rounded-xl backdrop-blur-3xl",
        STATUS[status],
        className,
      )}
      {...styles}
    >
      <div className={twMerge("flex items-center justify-between gap-2")}>
        <div className={twMerge("flex items-start gap-2")}>
          <div className="flex flex-col gap-0">
            <span className="font-semibold">{title}</span>
            {description && (
              <span className="text-sm opacity-70">{description}</span>
            )}
          </div>
        </div>
        {closable && (
          <Image
            src={IC_X}
            alt="close"
            onClick={() => {
              if (onClick) onClick();
              setIsShow(false);
            }}
            className="w-4 cursor-pointer"
          />
        )}
      </div>
    </div>
  ) : null;
};

export default ToastCard;
