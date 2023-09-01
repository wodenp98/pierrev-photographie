import Link from "next/link";
import Image from "next/image";

export const LinkInstagram = () => {
  return (
    <Link
      href="https://www.instagram.com/pierrev.photographie"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center"
    >
      <Image
        src="/icon-instagram.svg"
        alt="Instagram"
        width={40}
        height={40}
        className="pr-4"
      />
      <p>@pierre.v.photographie</p>
    </Link>
  );
};
