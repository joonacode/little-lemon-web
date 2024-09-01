import { useCart } from "@/hooks/use-context";
import { IC_STAR } from "../../assets";
import { CartActionKind } from "../../context/cart-context";
import { Button, Image } from "../ui";

type Props = {
  title: string;
  description: string;
  rating: string;
  price: string;
  category: string;
  images: string;
  id: string;
};

export const CardMenu = ({
  title,
  description,
  rating,
  price,
  category,
  images,
  id,
}: Props) => {
  const { dispatch } = useCart();

  return (
    <div className="rounded-[12px] overflow-hidden bg-orange-100 border border-orange-300">
      <Image
        src={images}
        alt={title}
        className="h-[250px] w-full object-cover"
      />
      <div className="p-4">
        <h5 className="font-bold text-lg">{title}</h5>
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-medium">${price}</span>
          <span className="block h-2 w-2 rounded-full bg-dark-200" />
          <div className="flex items-center space-x-1">
            <Image src={IC_STAR} alt="star" />
            <span className="font-medium">{rating}</span>
          </div>
          <span className="block h-2 w-2 rounded-full bg-dark-200" />
          <span className="font-medium">{category}</span>
        </div>
        <p className="text-dark-300 mb-4">{description}</p>
        <Button
          onClick={() =>
            dispatch({ type: CartActionKind.ADD, payload: { id, amount: 1 } })
          }
        >
          Order Menu
        </Button>
      </div>
    </div>
  );
};
