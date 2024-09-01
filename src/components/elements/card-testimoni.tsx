import { twMerge } from "tailwind-merge";
import { Image } from "../ui";

type Props = {
  name: string;
  comment: string;
  avatar: string;
  className?: string;
};

export const CardTestimoni = ({ name, comment, avatar, className }: Props) => {
  return (
    <div
      className={twMerge(
        "p-4 rounded-[12px] overflow-hidden bg-orange-100 border border-orange-300",
        className,
      )}
    >
      <p className="text-dark-300">&quot;{comment}&quot;</p>
      <div className="border-t border-dashed flex items-center justify-between gap-2 pt-4 mt-4">
        <p className="font-medium capitalize">{name}</p>
        <Image
          className="h-10 bg-dark-100 w-10 rounded-full object-cover"
          src={avatar}
          alt={name}
        />
      </div>
    </div>
  );
};
