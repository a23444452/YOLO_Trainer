import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { name: 'NVIDIA', icon: 'N' },
  { name: 'Intel', icon: 'I' },
  { name: 'Google', icon: 'G' },
  { name: 'Microsoft', icon: 'M' },
  { name: 'Amazon', icon: 'A' },
  { name: 'Meta', icon: 'F' },
  { name: 'OpenAI', icon: 'O' },
  { name: 'Tesla', icon: 'T' },
];

export function LogoCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Infinite scroll animation
    const totalWidth = track.scrollWidth / 2;
    
    gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    // Speed up on scroll
    const triggers: ScrollTrigger[] = [];
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const speedMultiplier = 1 + velocity / 5000;
        gsap.to(track, {
          timeScale: speedMultiplier,
          duration: 0.3,
        });
      },
    });
    triggers.push(st);

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 overflow-hidden border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm text-gray-500 uppercase tracking-widest">
          受到頂尖 AI 團隊的信賴
        </p>
      </div>

      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Logo track */}
        <div
          ref={trackRef}
          className="flex gap-16 items-center"
          style={{ width: 'max-content' }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 rounded-xl glass hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-bold text-lg group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
                {logo.icon}
              </div>
              <span className="text-gray-400 font-medium group-hover:text-white transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
