import { useAuth, useCart } from "@/hooks/use-context";
import { Button, Container, Image } from "../ui";
import { IC_CART, LOGO, LOGO_FULL } from "@/assets";
import { ModalRegister } from "./modal-register";
import { useModal } from "@/hooks/use-modal";
import { ModalLogin } from "./modal-login";
import { useEffect, useRef, useState } from "react";
import { AuthActionKind } from "@/context";

export const MENUS = [
  {
    title: "Home",
    href: "/",
    id: "hero",
  },
  {
    title: "Product",
    href: "/#best-sellers",
    id: "best-sellers",
  },
  {
    title: "Testimoni",
    href: "/#testimoni",
    id: "testimoni",
  },
  {
    title: "About",
    href: "/#about",
    id: "about",
  },
];

export const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: modalRegister,
    onClose: closeModalRegister,
    onOpen: openModalRegister,
  } = useModal();

  const {
    isOpen: modalLogin,
    onClose: closeModalLogin,
    onOpen: openModalLogin,
  } = useModal();

  const { state } = useCart();
  const { state: authState, dispatch } = useAuth();

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleClick = (anchor: string) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      if (headerRef.current) {
        headerRef.current.style.transform =
          scrollPosition >= currentScrollPosition
            ? "translateY(0)"
            : "translateY(-200px)";
      }
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);
  return (
    <>
      <header
        className="py-5 sticky top-0 bg-yellow-100 transform transition duration-300 z-10"
        ref={headerRef}
      >
        <Container className="flex items-center justify-between">
          <a href="/#">
            <Image
              src={LOGO_FULL}
              alt="Logo"
              className="w-[160px] md:block hidden"
            />
            <Image src={LOGO} alt="Logo" className="w-[30px] md:hidden block" />
          </a>
          <nav className="items-center gap-5 md:flex hidden">
            {MENUS.map((menu, i) => (
              <a key={i} href={menu.href} onClick={handleClick(menu.id)}>
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
            {authState.me ? (
              <Button
                onClick={() =>
                  dispatch({ type: AuthActionKind.LOGOUT, payload: undefined })
                }
              >
                Logout
              </Button>
            ) : (
              <>
                <Button onClick={openModalLogin}>Login</Button>
                <Button
                  onClick={openModalRegister}
                  color="primary-outline"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </Container>
      </header>
      <ModalRegister isOpen={modalRegister} onClose={closeModalRegister} />
      <ModalLogin isOpen={modalLogin} onClose={closeModalLogin} />
    </>
  );
};
