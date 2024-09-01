import { IL_ABOUT } from "../../assets";
import { Container, Image } from "../ui";

export const AboutUs = () => {
  return (
    <Container id="about" as="section" className="py-0 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="font-title font-bold text-3xl mb-3">About Us</h1>
        <p className="w-[80%] text-dark-300 text-lg mb-4">
          Welcome to Little Lemon, where the flavors of the Mediterranean come
          to life. As a family-owned restaurant, we're passionate about sharing
          authentic recipes that have been passed down through generations. Our
          menu features classic dishes with a contemporary flair, ensuring a
          delightful culinary experience for every palate. From our hand-picked
          ingredients to our warm hospitality, we strive to create a welcoming
          atmosphere where you can savor the taste of the Mediterranean.
        </p>
      </div>
      <Image src={IL_ABOUT} alt="hero_little_lemon" className="w-[52%]" />
    </Container>
  );
};
