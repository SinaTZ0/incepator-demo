import { useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";

// import HeroSection from "./sections/HeroSection";
// import ResearchPillarsSection from "./sections/ResearchPillarsSection";
// import InnovationSpotlightSection from "./sections/InnovationSpotlightSection";
// import CollaborationModelSection from "./sections/CollaborationModelSection";
// import StudentVenturesSection from "./sections/StudentVenturesSection";
// import FacultyMentorsSection from "./sections/FacultyMentorsSection";
// import FacilitiesLabsSection from "./sections/FacilitiesLabsSection";
// import IndustryBridgeSection from "./sections/IndustryBridgeSection";
// import GlobalNetworkSection from "./sections/GlobalNetworkSection";
import StationedTeamsSection from "./sections/StationedTeamsSection";
import EventsShowcasesSection from "./sections/EventsShowcasesSection";
import SuccessStoriesSection from "./sections/SuccessStoriesSection";
import ContactApplySection from "./sections/ContactApplySection";

import { useReducedMotion } from "./hooks/useReducedMotion";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useAppScale } from "./hooks/useAppScale";
import { ThemeProvider } from "./hooks/useTheme";
import HeroSection2 from "./sections/HeroSection2";

gsap.registerPlugin(ScrollTrigger);

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Enable keyboard navigation
  useKeyboardNavigation();

  // Scale UI to 1080p baseline (clamps down only)
  useAppScale();

  // const handleLoadingComplete = () => {
  //   setIsLoading(false);
  // };

  return (
    <ThemeProvider>
      {/* Loading Screen */}
      {/* {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />} */}

      {/* Custom Cursor (desktop only, respects reduced motion) */}
      {!prefersReducedMotion && <CustomCursor />}

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Main App */}
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Mesh Gradient Background */}
        <div className="mesh-gradient" />

        {/* Particle Background (respects reduced motion) */}
        {!prefersReducedMotion && <ParticleBackground />}

        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content - Free scroll, no snap */}
        <main className="relative">
          <HeroSection2 />
          {/* <ResearchPillarsSection /> */}
          {/* <InnovationSpotlightSection /> */}
          {/* <CollaborationModelSection /> */}
          {/* <StudentVenturesSection /> */}
          <StationedTeamsSection />
          {/* <FacultyMentorsSection /> */}
          {/* <FacilitiesLabsSection /> */}
          {/* <IndustryBridgeSection /> */}
          {/* <GlobalNetworkSection /> */}
          <EventsShowcasesSection />
          <SuccessStoriesSection />
          <ContactApplySection />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
