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
  const gallery = await fetchData<any>(`
		*[_type == 'gallery']{
			tab,
			categories[]{
				name,
				art[]->{
				...
				}
			},

		}
	`);

  let galleryData = {};
  console.log(gallery[0].categories[0].art);
  let map = new Map();
  if (gallery) {
    for (let tabs of gallery) {
      // galleryData[tabs.tab] = tabs;
      map.set(tabs.tab, tabs.categories);
    }
  }
  return (
    <main id="container_home">
      <LoadingSkip />
      <HeroSection activeNav="gallery" />
      <GallerySection data={Object.fromEntries(map)} />
      <Footer />
    </main>
  );
}
