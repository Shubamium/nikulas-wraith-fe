import React, { useEffect } from "react";
import TimeSyncSection from "../section/TimeSyncSection/TimeSyncSection";
import LoadingSkip from "../components/LoadingSkip/LoadingSkip";
import { fetchData } from "@/db/client";
import { GeneralType } from "../page";
import Footer from "../components/Footer/Footer";
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
    <main id="container_home" className="isOverlay">
      <LoadingSkip />
      <TimeSyncSection
        targetTime={generalData[0].time.date}
        isActive={generalData[0].time.active}
        onlyTime={true}
        noBg={true}
      />
    </main>
  );
}
