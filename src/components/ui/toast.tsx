import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Image } from "./image";
import { IC_X } from "@/assets";

export interface ToastCardProps extends React.ComponentProps<"div"> {
  className?: string;
  title: string;
  description?: string;
  withIcon?: boolean;
  closable?: boolean;
  onClick?: () => void;
}

const ToastCard: React.FC<ToastCardProps> = (props) => {

  const { className, title, description, closable, onClick, ...styles } = props;

  const [isShow, setIsShow] = useState(true);


  return isShow ? (
    <div className={twMerge("", className)} {...styles}>
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
          />
        )}
      </div>
    </div>
  ) : null;
};

export default ToastCard;
