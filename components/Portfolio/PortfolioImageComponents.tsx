import Image from "next/image";

type PortfolioImage = {
  src: string;
  alt: string;
  theme: string;
};

export const PortfolioImageComponents = ({
  src,
  alt,
  theme,
}: PortfolioImage) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden h-full cursor-pointer">
        <Image
          src={src}
          alt={alt}
          height={300}
          width={300}
          className="rounded-md col-span-1 w-full h-full object-cover"
        />
        <div className="rounded-md absolute h-full w-full bg-black/50 flex items-center justify-center  group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p className=" text-white font-bold text-xl py-2 px-5">{theme}</p>
        </div>
      </div>
    </div>
  );
};
