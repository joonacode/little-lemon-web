import { useModal } from "@/hooks/use-modal";
import { Button, Container, Image } from "../ui";
import { ModalReserve } from "./modal-reserve";
import { IL_FOOD } from "@/assets";
import { twMerge } from "tailwind-merge";

export const Hero = () => {
  const { isOpen, onClose, onOpen } = useModal();
  return (
    <>
      <Container
        as="section"
        className="py-0 flex items-center md:justify-between h-[calc(50svh)] xs:h-[calc(100svh_-_70px)] relative xs:bottom-12 bottom-7 overflow-hidden"
      >
        <div className="flex-1">
          <h1
            className={twMerge(
              "font-title font-bold ",
              "text-4xl sm:text-5xl xl:text-6xl mb-3 leading-snug sm:leading-[60px] xl:leading-[76px]",
            )}
          >
            Little Lemon<span className="hidden md:inline">,</span>
            <br />
            <span className="xs:inline hidden">
              Mediterranean <br />
            </span>
            <span className="xs:inline hidden">Magic in Every Bite</span>
          </h1>
          <p className="md:w-[80%] w-[60%] text-dark-300 sm:text-lg text-base mb-8">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <div className="flex items-center gap-3">
            <Button size="lg" onClick={onOpen}>
              Reserve Now
            </Button>
            <Button
              className="bg-brown-400/10 text-dark-400 xs:block hidden"
              color="secondary"
              size="lg"
            >
              Order Online
            </Button>
          </div>
        </div>
        <Image
          src={IL_FOOD}
          alt="hero_little_lemon"
          className="xs:w-[50%] w-[60%] md:relative absolute right-[-4rem] xs:right-[-4rem] z-[-1]"
        />
      </Container>
      <ModalReserve isOpen={isOpen} onClose={onClose} />
    </>
  );
};
