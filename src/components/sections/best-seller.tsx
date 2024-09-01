import { useState } from "react";
import { BEST_SELLERS } from "../../constants";
import { CardMenu } from "../elements/card-menu";
import { Badge, Button, Container } from "../ui";

const CATEGORY = [
  {
    value: "launch",
    label: "Launch",
  },
  {
    value: "Mains",
    label: "mains",
  },
  {
    value: "Desserts",
    label: "deserts",
  },
  {
    value: "A La Carte",
    label: "alacarte",
  },
];

export const BestSeller = () => {
  const [category, setCategory] = useState("");
  return (
    <Container as={"section"} id="best-sellers" className="pb-32 scroll-mt-28">
      <div className="items-center justify-between mb-10 xs:flex hidden">
        <h2 className="font-medium text-3xl">Top Sellers</h2>
        <Button>All Menu</Button>
      </div>
      <div className="pb-6 border-b mb-6 300 border-brown-100/20 xs:hidden block">
        <h2 className="font-medium mb-3 text-3xl">Order For Delivery</h2>
        <div className="flex items-center gap-2">
          {CATEGORY.map((item) => (
            <Badge
              onClick={() => setCategory(item.value)}
              color={category === item.value ? "primary" : "secondary"}
              key={item.value}
            >
              {item.label}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-6">
        {BEST_SELLERS.map((menu, i) => (
          <CardMenu key={i} {...menu} />
        ))}
      </div>
    </Container>
  );
};
