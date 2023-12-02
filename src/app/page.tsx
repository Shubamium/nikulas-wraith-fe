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
import { groq } from "next-sanity";

type GeneralType = {
  _id: string;
  preset: string;
  schedules: any; // Assuming 'schedules' is of type 'string'. Change it to the correct type.
  stats: {
    bad: number;
    good: number;
  };
};
export default async function Home() {

	const generalData = (await fetchData(`
	*[_type == 'general' && preset == 'main']{
		_id,
		preset,
		schedules,
		stats
	}
	`) as GeneralType[])[0]

  return (
    <>
				<main id="container_home">
					<HeroSection />
					<AboutSection />
					<SocialsSection />
					<ModelSection />
					<ScheduleSection url={urlFor(generalData.schedules).url()} />
					<ArtworksSection />
					<SetupSection/>
					<SupportSection/>
					<ContactSection/>
				</main>
			<Footer/>
		</>
  );
}
