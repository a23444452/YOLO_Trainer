'use client'

import { useEffect, useRef, useState } from 'react';
import { Check, Cpu, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap, ScrollTrigger } from '@/lib/gsap'

const models = [
  {
    id: 'yolov5',
    name: 'YOLOv5',
    icon: Cpu,
    description: '經典穩定，適合入門',
    features: [
      '輕量級架構',
      '快速訓練',
      '廣泛相容',
      '社群支援',
    ],
    specs: {
      speed: '快速',
      accuracy: '良好',
      size: '小',
    },
    color: 'from-blue-500 to-blue-600',
    recommended: false,
  },
  {
    id: 'yolov8',
    name: 'YOLOv8',
    icon: Zap,
    description: '平衡之選，效能優異',
    features: [
      '最新架構',
      '高精度',
      '實例分割',
      '姿態估計',
    ],
    specs: {
      speed: '極快',
      accuracy: '優秀',
      size: '中',
    },
    color: 'from-orange-500 to-orange-600',
    recommended: true,
  },
  {
    id: 'yolov11',
    name: 'YOLOv11',
    icon: Rocket,
    description: '尖端技術，最佳效能',
    features: [
      '最先進技術',
      '最高準確率',
      '多任務支援',
      '未來導向',
    ],
    specs: {
      speed: '快',
      accuracy: '極佳',
      size: '大',
    },
    color: 'from-purple-500 to-purple-600',
    recommended: false,
  },
];

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState('yolov8');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    // Cards animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.model-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { rotateY: 180, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
  }, []);

  const selectedModelData = models.find((m) => m.id === selectedModel);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-orange-500 text-sm font-medium mb-4">
            模型選擇
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            選擇適合你的 YOLO 版本
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            從輕量級到高效能，我們支援多種 YOLO 版本以滿足不同需求
          </p>
        </div>

        {/* Model Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {models.map((model) => (
            <div
              key={model.id}
              className={`
                model-card relative group cursor-pointer
                ${selectedModel === model.id ? 'md:-translate-y-4' : ''}
              `}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setSelectedModel(model.id)}
            >
              {/* Recommended badge */}
              {model.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-xs font-bold rounded-full z-10">
                  推薦
                </div>
              )}

              <div className={`
                relative h-full rounded-2xl overflow-hidden transition-all duration-500
                ${selectedModel === model.id
                  ? 'bg-white/10 border-2 border-orange-500 shadow-glow-lg'
                  : 'glass border border-white/5 hover:border-white/20'}
              `}>
                {/* Gradient border for selected */}
                {selectedModel === model.id && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 opacity-20" />
                )}

                <div className="relative p-6 lg:p-8">
                  {/* Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl bg-gradient-to-br ${model.color}
                    flex items-center justify-center mb-6
                    ${selectedModel === model.id ? 'shadow-glow' : ''}
                  `}>
                    <model.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Name & Description */}
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {model.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {model.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {Object.entries(model.specs).map(([key, value]) => (
                      <div key={key} className="text-center p-2 rounded-lg bg-white/5">
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                        <div className="text-sm font-medium text-white">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {model.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                        <Check className={`
                          w-4 h-4 flex-shrink-0
                          ${selectedModel === model.id ? 'text-orange-500' : 'text-gray-600'}
                        `} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <Button
                    className={`
                      w-full rounded-full transition-all duration-300
                      ${selectedModel === model.id
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'}
                    `}
                  >
                    {selectedModel === model.id ? '已選擇' : '選擇'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Model Info */}
        {selectedModelData && (
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              已選擇: <span className="text-orange-500 font-bold">{selectedModelData.name}</span>
              {' '}- {selectedModelData.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
