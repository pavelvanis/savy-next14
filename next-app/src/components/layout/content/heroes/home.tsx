import Image from "next/image";
import Hero, { HeroSide } from "../../../hero";
import { Typography } from "@/components/ui";

export const HomeWelcomeHero = () => (
  <Hero>
    <HeroSide className="">
      <Image
        src="/statistics_02.svg"
        alt="Hero Image"
        width={400}
        height={400}
      />
    </HeroSide>
    <HeroSide className="">
      <Typography variant="h1" className="">
        Welcome to savy
      </Typography>
    </HeroSide>
  </Hero>
);

export const HomeAboutHero = () => (
  <Hero className="">
    <HeroSide className="">
      <Typography variant="h2" className="text-center">
        Lets check your accounts
      </Typography>
    </HeroSide>
    <HeroSide className="">
      <Image
        src="/statistics_01.svg"
        alt="Hero Image"
        width={300}
        height={300}
        className="w-26 h-26 bg-transparent"
      />
    </HeroSide>
  </Hero>
);
