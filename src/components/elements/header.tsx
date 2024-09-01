import { useCart } from "@/hooks/use-context";
import { Button, Container, Image } from "../ui";
import { IC_CART, LOGO_FULL } from "@/assets";
import { ModalRegister } from "./modal-register";
import { useModal } from "@/hooks/use-modal";

export const MENUS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Product",
    href: "/product",
  },
  {
    title: "Reservation",
    href: "/Reservation",
  },
  {
    title: "Order Online",
    href: "/order-online",
  },
];

export const Header = () => {
  const {isOpen: modalRegister, onClose: closeModalRegister, onOpen: openModalRegister} = useModal()
  const { state } = useCart();
  return (
    <>
      <Container
        as={"header"}
        className="flex items-center justify-between py-5"
      >
        <Image src={LOGO_FULL} alt="Logo" className="w-[160px]" />
        <nav className="flex items-center gap-5">
          {MENUS.map((menu, i) => (
            <a key={i} href={menu.href}>
              {menu.title}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative cursor-pointer" role="button">
            <Image src={IC_CART} alt="cart" className="w-10 mr-5" />
            {state.carts.length ? (
              <div className="absolute h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold top-0 right-3">
                {state.carts.length}
              </div>
            ) : null}
          </div>
          <Button>Login</Button>
          <Button onClick={openModalRegister} color="secondary">Register</Button>
        </div>
      </Container>
      <ModalRegister isOpen={modalRegister} onClose={closeModalRegister} />
    </>
  );
};
