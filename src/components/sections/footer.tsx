import { IL_ABOUT, LOGO } from "../../assets";
import { MENUS } from "../elements";
import { Container, Image } from "../ui";

const PRODUCT = [
  {
    title: "Best Sellers",
    href: "/",
  },
  {
    title: "Best Ratings",
    href: "/Reservation",
  },
  {
    title: "New Menu",
    href: "/order-online",
  },
];

const SOCIAL_MEDIA = [
  {
    title: "Instagram",
    href: "/",
  },
  {
    title: "Facebook",
    href: "/Reservation",
  },
  {
    title: "Twitter",
    href: "/order-online",
  },
  {
    title: "TikTok",
    href: "/order-online",
  },
];

const CONTACT = [
  {
    title:
      "Little Lemon 331 E Chicago LaSalle Street Chicago, Illinois 60602 USA",
  },
  {
    title: "+55 11 9999-9999",
  },
  {
    title: "contact@littlelemon.com",
  },
  {
    title: "TikTok",
  },
];

export const Footer = () => {
  return (
    <div className="border-t border-orange-300">
      <Container
        as="section"
        className="flex gap-0 items-start justify-between py-24"
      >
        <div className="w-[300px]">
          <Image src={LOGO} alt="logo" className="w-[100px]" />
        </div>
        <div className="flex-1 grid grid-cols-4">
          <div>
            <h6 className="font-medium text-lg mb-4">Sitemaps</h6>
            <div className="flex flex-col gap-2">
              {MENUS.map((menu, i) => (
                <a key={i} href={menu.href} className="text-dark-300">
                  {menu.title}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h6 className="font-medium text-lg mb-4">Product</h6>
            <div className="flex flex-col gap-2">
              {PRODUCT.map((menu, i) => (
                <a key={i} href={menu.href} className="text-dark-300">
                  {menu.title}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h6 className="font-medium text-lg mb-4">Social Media</h6>
            <div className="flex flex-col gap-2">
              {SOCIAL_MEDIA.map((menu, i) => (
                <a key={i} href={menu.href} className="text-dark-300">
                  {menu.title}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h6 className="font-medium text-lg mb-4">Contact</h6>
            <div className="flex flex-col gap-2">
              {CONTACT.map((menu, i) => (
                <span key={i} className="text-dark-300">
                  {menu.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container className="border-t border-orange-300 py-5 flex items-center justify-between">
        <p className="">Copyright &copy; {new Date().getFullYear()} Little Lemon </p>
        <p className="">Develop by <a className="underline" href="https://github.com/joonacode" target="_blank">Joonacode</a></p>
      </Container>
    </div>
  );
};
