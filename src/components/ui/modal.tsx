import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { Image } from "./image";
import { IC_X } from "@/assets";

const SIZE = {
  sm: "w-[550px]",
  base: "w-full lg:w-[800px]",
};

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  size?: keyof typeof SIZE;
  title?: string;
  description?: string;
  onClose: () => void;
}>;

export const Modal = ({
  isOpen,
  size = "base",
  title,
  description,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) return null;
  const renderData = () => {
    return (
      <div className="w-full h-full bg-dark-400/80 backdrop-blur flex items-end xs:items-center justify-center fixed top-0 left-0 z-50">
        <div className={twMerge("bg-yellow-100 rounded-t-xl xs:rounded-xl p-5 mx-0 xs:mx-2", SIZE[size])}>
          {title ? (
            <div className="flex items-center justify-between gap-2 mb-5 border-b pb-4 border-dark-100">
              <div>
                <h2 className="font-bold text-2xl">{title}</h2>
                {description && <p className="text-dark-300 mt-1">{description}</p>}
              </div>
              <Image
                src={IC_X}
                alt="close"
                role="button"
                className="w-4 cursor-pointer"
                onClick={onClose}
              />
            </div>
          ) : null}
          {children}
        </div>
      </div>
    );
  };
  return createPortal(renderData(), document.body);
};
