import { twMerge } from "tailwind-merge";
import { IL_IMAGE_CRASH } from "../../assets";

type Props = {
  className?: string;
  src: string;
  alt: string;
  [key: string]: any;
};

export const Image = ({ className, src, alt, ...props }: Props) => {
  function addDefaultSrc(e: any) {
    e.target.onerror = null;
    e.target.src = IL_IMAGE_CRASH;
    e.target.srcset = IL_IMAGE_CRASH;
  }

  return (
    <img
      className={twMerge("", className)}
      src={src}
      alt={alt}
      loading="lazy"
      onError={addDefaultSrc}
      {...props}
    />
  );
};
