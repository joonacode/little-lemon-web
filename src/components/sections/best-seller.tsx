import { BEST_SELLERS } from "../../constants";
import { CardMenu } from "../elements/card-menu";
import { Button, Container } from "../ui";

export const BestSeller = () => {
  return (
    <Container as={"section"} id="best-sellers" className="pb-32 scroll-mt-28">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-medium text-3xl">Top Sellers</h2>
        <Button>All Menu</Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {BEST_SELLERS.map((menu, i) => (
          <CardMenu key={i} {...menu} />
        ))}
      </div>
    </Container>
  );
};
