import { twMerge } from "tailwind-merge";
import {
  IL_TABLE_2_DISABLED,
  IL_TABLE_2_OUTLINE,
  IL_TABLE_2_SOLID,
  IL_TABLE_3_DISABLED,
  IL_TABLE_3_OUTLINE,
  IL_TABLE_3_SOLID,
} from "../../assets";
import { Image } from "../ui";

type Props = {
  number: "3" | "2";
  tableNumber: number;
  isAvailable: boolean;
  isSelected?: boolean;
  onClick: (value: number) => void;
};

const IMAGES = {
  "3": {
    outline: IL_TABLE_3_OUTLINE,
    solid: IL_TABLE_3_SOLID,
    disabled: IL_TABLE_3_DISABLED,
  },
  "2": {
    outline: IL_TABLE_2_OUTLINE,
    solid: IL_TABLE_2_SOLID,
    disabled: IL_TABLE_2_DISABLED,
  },
};

export const ReservedTable = ({
  number,
  isAvailable,
  tableNumber,
  isSelected,
  onClick,
}: Props) => {
  return (
    <div
      className={twMerge(
        "relative flex items-center justify-center cursor-pointer",
        !isAvailable && "cursor-not-allowed",
      )}
      role="button"
      onClick={isAvailable ? () => onClick(tableNumber) : () => null}
    >
      <Image
        src={
          IMAGES[number][
            isAvailable ? (isSelected ? "solid" : "outline") : "disabled"
          ]
        }
        alt={`reserve_table_${number}`}
      />
      <span className="absolute">{tableNumber}</span>
    </div>
  );
};
