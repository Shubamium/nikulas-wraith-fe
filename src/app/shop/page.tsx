import React from "react";
import HeroSection from "../section/HeroSection/HeroSection";
import LoadingSkip from "../components/LoadingSkip/LoadingSkip";
import Footer from "@/app/components/Footer/Footer";
import StoreSection from "../section/StoreSection/StoreSection";
type Props = {};

export default async function Page({}: Props) {
  return (
    <main id="container_home">
      <LoadingSkip />
      <HeroSection activeNav="shop" />
      <StoreSection />
      <Footer />
    </main>
  );
}
