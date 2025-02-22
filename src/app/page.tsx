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
import ClipsSection from "./section/ClipsSection/ClipsSection";

export type GeneralType = {
  _id: string;
  preset: string;
  schedules: any;
  video: string;
  sa: string;
  time: {
    date: string;
    active: boolean;
  };
  stats: {
    bad: number;
    good: number;
  };
  models: ModelsType[];
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
		'video':video.asset->url,
		schedules,
		'sa': sa.asset -> url,
		stats,
		models[]->{
			_id,
		type,
		name,
		link,
		artwork_large,
		artwork_small
		}
	}
	`)) as GeneralType[]
  )[0];

  const modelsData = generalData ? generalData.models : [];

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

        <AboutSection sa={generalData.sa} video={generalData.video} />
        <SocialsSection />
        <ModelSection
          models={modelsData.map((model) => {
            return {
              link: model.link,
              name: model.name,
              type: model.type,
              large: urlFor(model.artwork_large)?.url(),
              small: urlFor(model.artwork_small)?.url(),
            };
          })}
        />
        <ScheduleSection
          url={urlFor(generalData.schedules)?.url()}
          sa={generalData.sa}
        />
        <ArtworksSection />
        <ClipsSection />
        <SetupSection />
        <SupportSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
