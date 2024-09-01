import { ToastCardProps } from "@/components/ui";
import ToastCard from "@/components/ui/toast";
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

interface ToastProviderProps {
  children: React.ReactNode;
}

interface Toast extends ToastCardProps {
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  id?: string;
  autoClose?: boolean;
  closeDuration?: number;
}

interface ContextProps {
  listToast: Toast[];
  addToast: (item: Toast) => void;
  clearAll: () => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ContextProps | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [listToast, setListToast] = useState<Toast[]>([]);

  const addToast = (newItem: Toast) => {
    setListToast((current) => [
      ...current,
      {
        autoClose: true,
        closable: newItem?.closable ?? true,
        closeDuration: 5000,
        position: "top-right",
        ...newItem,
        title: `${newItem.title}-${current.length + 1}`,
        id: `${current.length + 1}`,
      },
    ]);
  };

  const clearAll = () => {
    setListToast([]);
  };

  const removeToast = (id: string) => {
    setListToast((prev) => prev.filter((item) => item.id !== id));
  };

  const contextValues = useMemo(() => {
    return {
      listToast,
      addToast,
      clearAll,
      removeToast,
    };
  }, [listToast]);

  useEffect(() => {
    const toastsToClose = listToast.filter((x) => x.autoClose);
    if (toastsToClose.length > 0) {
      toastsToClose.forEach((toast) => {
        setTimeout(() => {
          removeToast(toast.id as string);
        }, toast.closeDuration);
      });
    }
  }, [listToast]);

  const renderGroupToast = (position: Toast["position"]) => {
    const toasts = listToast.filter((x) => x.position === position);
    if (toasts.length === 0) return null;

    return (
      <div
        className={twMerge(
          "fixed min-w-[300px] max-w-[400px] h-auto flex flex-col gap-3",
          position === "top-right" && "top-2 right-2",
          position === "top-left" && "top-2 left-2",
          position === "top-center" && "top-2 left-[40%]",
          position === "bottom-right" && "bottom-2 right-2",
          position === "bottom-left" && "bottom-2 left-2",
          position === "bottom-center" && "bottom-2 left-[40%]",
        )}
      >
        {toasts.map((item) => (
          <div key={item.id} className={twMerge("toast-fade")}>
            <ToastCard
              {...item}
              onClick={
                item.closable ? () => removeToast(item.id as string) : undefined
              }
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <ToastContext.Provider value={contextValues}>
      {children}
      {ReactDOM.createPortal(
        <>
          {renderGroupToast("top-right")}
          {renderGroupToast("top-left")}
          {renderGroupToast("top-center")}
          {renderGroupToast("bottom-right")}
          {renderGroupToast("bottom-left")}
          {renderGroupToast("bottom-center")}
        </>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};
