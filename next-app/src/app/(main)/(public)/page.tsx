import React from "react";
import {
  HomeAboutHero,
  HomeWelcomeHero,
} from "@/components/layout/content/heroes/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Savy",
  description:
    "Welcome to Savy, the best place to manage your banking accounts and transactions",
};

const HomePage = () => {
  return (
    <>
      <HomeWelcomeHero />
      <HomeAboutHero />
    </>
  );
};

export default HomePage;
