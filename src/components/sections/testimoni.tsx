import { twMerge } from "tailwind-merge";
import { TESTIMONI } from "../../constants";
import { CardTestimoni } from "../elements";

type Props = {
  className?: string;
};

export const Testimoni = ({ className }: Props) => {
  return (
    <section id="testimoni" className={twMerge("pt-28 pb-40 bg-orange-200/50 rounded-[5%]", className)}>
      <div className="flex items-center justify-center mb-16">
        <h2 className="font-medium text-3xl text-center px-5">What People Says About Little Lemon</h2>
      </div>
      <div className="w-full flex overflow-hidden mb-4">
        <div className="flex scroll-testimoni gap-4">
          {TESTIMONI.map((menu, i) => (
            <div key={i}>
              <CardTestimoni className="w-[400px]" {...menu} />
            </div>
          ))}
          {TESTIMONI.map((menu, i) => (
            <div key={i}>
              <CardTestimoni className="w-[400px]" {...menu} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex overflow-hidden">
        <div className="flex scroll-testimoni-reverse gap-4">
          {TESTIMONI.map((menu, i) => (
            <div key={i}>
              <CardTestimoni className="w-[400px]" {...menu} />
            </div>
          ))}
          {TESTIMONI.map((menu, i) => (
            <div key={i}>
              <CardTestimoni className="w-[400px]" {...menu} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
