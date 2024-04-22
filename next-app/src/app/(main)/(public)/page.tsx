import React from "react";
import {
  HomeAboutHero,
  HomeWelcomeHero,
} from "@/components/layout/content/heroes/home";

const HomePage = () => {
  return (
    <>
      <HomeWelcomeHero />
      <HomeAboutHero />
    </>
  );
};

export default HomePage;
