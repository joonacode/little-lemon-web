import { useModal } from "@/hooks/use-modal";
import { Button, Container, Image } from "../ui";
import { ModalReserve } from "./modal-reserve";
import { IL_FOOD } from "@/assets";

export const Hero = () => {
  const { isOpen, onClose, onOpen } = useModal();
  return (
    <Container as="section" className="py-0 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="font-title font-bold text-5xl mb-3 leading-[60px]">
          Little Lemon,
          <br />
          Mediterranean <br />
          Magic in Every Bite
        </h1>
        <p className="w-[80%] text-dark-300 text-lg mb-8">
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <div className="flex items-center gap-3">
          <Button size="lg" onClick={onOpen}>
            Reserve Now
          </Button>
          <Button
            className="bg-brown-400/10 text-dark-400"
            color="secondary"
            size="lg"
          >
            Order Online
          </Button>
        </div>
      </div>
      <Image src={IL_FOOD} alt="hero_little_lemon" className="w-[50%]" />
      <ModalReserve isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};
