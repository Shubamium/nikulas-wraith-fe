import React, { useEffect } from "react";
import HeroSection from "../section/HeroSection/HeroSection";
import TimeSyncSection from "../section/TimeSyncSection/TimeSyncSection";
import LiveViewSection from "../section/LiveViewSection/LiveViewSection";
import LoadingSkip from "../components/LoadingSkip/LoadingSkip";
import { fetchData } from "@/db/client";
import { GeneralType } from "../page";
import Footer from "@/app/components/Footer/Footer";
import GallerySection from "../section/GallerySection/GallerySection";
type Props = {};

export default async function Gallery({}: Props) {
  return (
    <main id="container_home">
      <LoadingSkip />
      <HeroSection activeNav="gallery" />
      <GallerySection />
      <Footer />
    </main>
  );
}
