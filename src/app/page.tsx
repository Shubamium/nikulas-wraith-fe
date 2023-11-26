import AboutSection from "./section/AboutSection/AboutSection";
import ArtworksSection from "./section/ArworksSection/ArtworksSection";
import ContactSection from "./section/ContactSection/ContactSection";
import HeroSection from "./section/HeroSection/HeroSection";
import ModelSection from "./section/ModelSection/ModelSection";
import ScheduleSection from "./section/ScheduleSection/ScheduleSection";
import SocialsSection from "./section/SocialsSection/SocialsSection";

export default function Home() {
  return (
    <main id="container_home">
      <HeroSection />
      <AboutSection />
      <SocialsSection />
      <ModelSection />
      <ScheduleSection />
      <ArtworksSection />
    </main>
  );
}
