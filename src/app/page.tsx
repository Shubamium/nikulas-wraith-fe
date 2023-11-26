import AboutSection from "./section/AboutSection/AboutSection";
import ArtworksSection from "./section/ArworksSection/ArtworksSection";
import ContactSection from "./section/ContactSection/ContactSection";
import HeroSection from "./section/HeroSection/HeroSection";
import ModelSection from "./section/ModelSection/ModelSection";
import ScheduleSection from "./section/ScheduleSection/ScheduleSection";
import SetupSection from "./section/SetupSection/SetupSection";
import SocialsSection from "./section/SocialsSection/SocialsSection";
import SupportSection from "./section/SupportSection/SupportSection";

export default function Home() {
  return (
    <main id="container_home">
      <HeroSection />
      <AboutSection />
      <SocialsSection />
      <ModelSection />
      <ScheduleSection />
      <ArtworksSection />
			<SetupSection/>
			<SupportSection/>
    </main>
  );
}
