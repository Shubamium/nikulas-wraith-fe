import { fetchData, urlFor } from "@/db/client";
import Footer from "./components/Footer/Footer";
import AboutSection from "./section/AboutSection/AboutSection";
import ArtworksSection from "./section/ArworksSection/ArtworksSection";
import ContactSection from "./section/ContactSection/ContactSection";
import HeroSection from "./section/HeroSection/HeroSection";
import ModelSection from "./section/ModelSection/ModelSection";
import ScheduleSection from "./section/ScheduleSection/ScheduleSection";
import SetupSection from "./section/SetupSection/SetupSection";
import SocialsSection from "./section/SocialsSection/SocialsSection";
import SupportSection from "./section/SupportSection/SupportSection";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

export type GeneralType = {
  _id: string;
  preset: string;
  schedules: any;
  sa: string;
  time: {
    date: string;
    active: boolean;
  };
  stats: {
    bad: number;
    good: number;
  };
};

type ModelsType = {
  _id: string;
  type: string;
  name: string;
  link: string;
  artwork_large: any;
  artwork_small: any;
};
export default async function Home() {
  const generalData = (
    (await fetchData(`
	*[_type == 'general' && preset == 'main']{
		_id,
		preset,
		schedules,
		'sa': sa.asset -> url,
		stats
	}
	`)) as GeneralType[]
  )[0];

  const modelsData = (await fetchData(`
	*[_type == 'models']{
		_id,
		type,
		name,
		link,
		artwork_large,
		artwork_small
	}
	`)) as ModelsType[];
  console.log(generalData.stats);
  return (
    <>
      <LoadingScreen
        bad={generalData.stats.bad}
        good={generalData.stats.good}
      />
      <main id="container_home">
        <HeroSection
          bad={generalData.stats.bad}
          good={generalData.stats.good}
          activeNav="home"
        />
        <AboutSection />
        <SocialsSection />
        <ModelSection
          models={modelsData.map((model) => {
            return {
              link: model.link,
              name: model.name,
              type: model.type,
              large: urlFor(model.artwork_large).url(),
              small: urlFor(model.artwork_small).url(),
            };
          })}
        />
        <ScheduleSection
          url={urlFor(generalData.schedules).url()}
          sa={generalData.sa}
        />
        <ArtworksSection />
        <SetupSection />
        <SupportSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
