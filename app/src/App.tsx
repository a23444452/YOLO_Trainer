import { useEffect } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { LogoCarousel } from './sections/LogoCarousel';
import { Features } from './sections/Features';
import { DownloadSection } from './sections/DownloadSection';
import { DemoGallery } from './sections/DemoGallery';
import { Pricing } from './sections/Pricing';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <main>
        <Hero />
        <LogoCarousel />
        <Features />
        <DownloadSection />
        <DemoGallery />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
