'use client'

import { useEffect, useRef } from 'react';
import { Upload, Brain, Rocket } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap'

const steps = [
  {
    icon: Upload,
    title: '上傳資料',
    description: '支援圖片和影片格式。我們會自動進行預處理和標註，讓你輕鬆準備訓練數據。',
    features: ['自動標註', '資料增強', '格式轉換'],
  },
  {
    icon: Brain,
    title: '訓練模型',
    description: '選擇 YOLOv5、YOLOv8 或 YOLOv11，我們的引擎會在幾分鐘內優化你的 AI 模型。',
    features: ['多模型支援', '自動調參', '即時監控'],
  },
  {
    icon: Rocket,
    title: '部署應用',
    description: '一鍵匯出為 ONNX、TensorRT 或 CoreML 格式，快速整合到你的應用中。',
    features: ['多格式匯出', '邊緣裝置', '雲端部署'],
  },
];

export function Workflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Line draw animation
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(lineRef.current, {
            strokeDashoffset: length * (1 - self.progress),
            duration: 0.1,
          });
        },
      });
      triggers.push(st);
    }

    // Steps animation
    if (stepsRef.current) {
      const stepCards = stepsRef.current.querySelectorAll('.step-card');
      stepCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-orange-500 text-sm font-medium mb-4">
            訓練流程
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            三步驟開始你的 AI 之旅
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            簡單直觀的流程設計，讓你專注於創新，而非繁瑣的技術細節
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connection Line - Desktop */}
          <svg
            className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden lg:block"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 100 8 Q 400 8 500 8 Q 600 8 900 8 Q 1000 8 1300 8"
              fill="none"
              stroke="#FF7B00"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Data particles */}
          <div className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden lg:block overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-orange-500 animate-pulse"
                style={{
                  left: `${i * 25}%`,
                  animation: `moveParticle 3s linear infinite`,
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            ))}
          </div>

          {/* Step Cards */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-card relative group"
              >
                <div className="glass rounded-2xl p-8 h-full transition-all duration-500 hover:scale-105 hover:bg-white/10 border border-white/5 hover:border-orange-500/30">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-glow">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center mb-6 group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-500">
                    <step.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {step.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-400 border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connector arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes moveParticle {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
