"use client";
import { useState, useCallback } from "react";

import { Loader } from "@/app/components/layout/loader";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Cursor } from "@/app/components/ui/Cursor";
import { ScrollProgress } from "@/app/components/ui/ScrollProgress";
import { ParticleField } from "@/app/components/3d/ParticleField";
import { SmoothScroll } from "@/app/components/animations/SmoothScroll";
import { PageAnimations } from "@/app/components/animations/PageAnimations";
import { CoverPage } from "@/app/components/sections/CoverPage";
import { About } from "@/app/components/sections/About";
import { Skills } from "@/app/components/sections/Skills";
import { Education } from "@/app/components/sections/Education";
import { Projects } from "@/app/components/sections/Projects";
import { Experience } from "@/app/components/sections/Experience";
import { Achievements } from "@/app/components/sections/Achievements";
import { Contact } from "@/app/components/sections/Contact";
import { SecretTerminal } from "@/app/components/ui/SecretTerminal";
import { GestureProvider } from "@/components/Gesture/GestureProvider";
import { GestureToggleButton } from "@/components/Gesture/GestureToggleButton";
import { FloatingChat } from "@/app/components/ui/FloatingChat";
import { GestureDebugOverlay } from "@/components/Gesture/GestureDebugOverlay";
import { scrollToSection } from "@/utils/scrollToSection";


export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderDone = useCallback(() => {
    setLoaded(true);
  }, []);

  // Victory gesture: the AI chat panel lives inside the Hero section's 3D
  // workspace. If we're scrolled away from Hero, opening the chat would be
  // invisible off-screen, so scroll to Hero first, then open it.
  const openAIAssistant = useCallback(() => {
  window.dispatchEvent(new CustomEvent("gesture:toggle-chat"));
}, []);

  return (
    <GestureProvider
      showPreview
      onOpenPalm={() => window.dispatchEvent(new CustomEvent("gesture:zoom-in"))}
      onFist={() => window.dispatchEvent(new CustomEvent("gesture:zoom-out"))}
      onVictory={openAIAssistant}
      onThumbsUp={() => scrollToSection("contact")}
    >
      <Cursor />
      <ScrollProgress />
      <GestureToggleButton />

      {!loaded && <Loader onDone={handleLoaderDone} />}

      <ParticleField />
      <div className="noise-overlay" />
      <div className="grid-overlay" />
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div className="vignette-overlay" />

      <SmoothScroll>
        {loaded && (
          <>
            <PageAnimations />
            <Header />
            <main>
              <CoverPage />
              <About />
              <Skills />
              <Education/>
              <Projects />
              <Experience />
              <Achievements />
              <Contact />
              <Footer />
              <SecretTerminal />
              <GestureToggleButton />
              <FloatingChat/>
<GestureDebugOverlay />
            </main>
          </>
        )}
      </SmoothScroll>
    </GestureProvider>
  );
}