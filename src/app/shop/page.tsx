import React from "react";
import HeroSection from "../section/HeroSection/HeroSection";
import LoadingSkip from "../components/LoadingSkip/LoadingSkip";
import { fetchData } from "@/db/client";
import Footer from "@/app/components/Footer/Footer";
import StoreSection from "../section/StoreSection/StoreSection";
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
      <HeroSection activeNav="shop" />
      <StoreSection />
      <Footer />
    </main>
  );
}
