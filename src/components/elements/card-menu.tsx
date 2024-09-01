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
    <div className="xs:rounded-xl rounded-none overflow-hidden bg-[transparent] xs:bg-orange-100 xs:border border-b xs:border-orange-300 border-brown-100/20 flex xs:flex-col flex-row-reverse xs:items-start items-center pb-5">
      <Image
        src={images}
        alt={title}
        className="xs:h-[250px] h-[140px] w-[110px] rounded-xl xs:rounded-none xs:w-full object-cover"
      />
      <div className="xs:p-4 p-0">
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
        <p className="text-dark-300 mb-4 xs:h-auto h-[50px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <Button
          className="xs:hidden block"
          size="sm"
          onClick={() =>
            dispatch({ type: CartActionKind.ADD, payload: { id, amount: 1 } })
          }
        >
          Add to Cart
        </Button>
        <Button
          className="xs:block hidden"
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
