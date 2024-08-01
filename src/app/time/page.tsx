import React, { useEffect } from "react";
import HeroSection from "../section/HeroSection/HeroSection";
import TimeSyncSection from "../section/TimeSyncSection/TimeSyncSection";
import LiveViewSection from "../section/LiveViewSection/LiveViewSection";
import LoadingSkip from "../components/LoadingSkip/LoadingSkip";
import { fetchData } from "@/db/client";
import { GeneralType } from "../page";
type Props = {};

export default async function Stream({}: Props) {
  const generalData = await fetchData<GeneralType[]>(`
	*[_type == 'general' && preset == 'main'] {
		preset,
		time
	}
	`);

  console.log(generalData[0]);
  return (
    <main id="container_home">
      <LoadingSkip />
      {/* <HeroSection activeNav='stream' /> */}
      <TimeSyncSection
        targetTime={generalData[0].time.date}
        isActive={generalData[0].time.active}
        onlyTime={true}
      />
    </main>
  );
}
