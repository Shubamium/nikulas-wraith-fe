import AboutSection from "./section/AboutSection/AboutSection";
import ContactSection from "./section/ContactSection/ContactSection";
import HeroSection from "./section/HeroSection/HeroSection";
import SocialsSection from "./section/SocialsSection/SocialsSection";

export default function Home() {
  return (
    <main id="container_home">
      <HeroSection />
      <AboutSection />
      <SocialsSection />
      <ContactSection />
    </main>
  );
}
