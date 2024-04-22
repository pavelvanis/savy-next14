import Image from "next/image";
import Link from "next/link";
import React from "react";

type Logo = { logo: string; url: string };

const logos: Logo[] = [
  {
    logo: "/logos/cypress.svg",
    url: "https://www.cypress.io/",
  },
  {
    logo: "/logos/nextjs.svg",
    url: "https://www.cypress.io/",
  },
  {
    logo: "/logos/react.svg",
    url: "https://www.cypress.io/",
  },
];

const LogoDivider = () => {
  return (
    <div className="flex gap-x-2 bg-gradient-to-r from-gray-50 to-gray-100 w-full justify-center py-3">
      {logos.map((logo, index) => (
        <Logo key={index} {...logo} />
      ))}
    </div>
  );
};

export default LogoDivider;

const Logo: React.FC<Logo> = ({ logo, url }) => (
  <Link href={url}>
    <Image
      src={logo}
      alt="Logo"
      width={82}
      height={200}
      className="h-8"
    />
  </Link>
);
