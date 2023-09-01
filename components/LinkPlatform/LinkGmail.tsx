import Image from "next/image";

export const LinkGmail = () => {
  return (
    <a
      href={`mailto:pierrev.photographie@gmail.com`}
      className="flex items-center"
      rel="noopener noreferrer"
    >
      <Image
        src="/icon-gmail.svg"
        alt="Gmail"
        width={40}
        height={40}
        className="pr-4"
      />
      <p>pierre.v.photographie@gmail.com</p>
    </a>
  );
};
