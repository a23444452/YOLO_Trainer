'use client'

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Video, Image as ImageIcon, Monitor } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap'

const demoItems = [
  {
    id: 1,
    type: 'image',
    title: '影片擷取',
    description: '從影片自動截取 frame，支援固定間隔或手動截取模式',
    thumbnail: '/images/video-capture.png',
  },
  {
    id: 2,
    type: 'image',
    title: '圖像標註',
    description: '內建完整的圖像標註工具，支援繪製邊界框、調整、刪除等操作',
    thumbnail: '/images/labeling.png',
  },
  {
    id: 3,
    type: 'image',
    title: '資料集製作',
    description: '自動將圖片與標籤檔分類為訓練集與驗證集',
    thumbnail: '/images/dataset.png',
  },
  {
    id: 4,
    type: 'image',
    title: '模型訓練',
    description: '支援 YOLOv5、YOLOv8、YOLOv11 訓練，可調整各項超參數',
    thumbnail: '/images/training.png',
  },
  {
    id: 5,
    type: 'image',
    title: '模型推論',
    description: '載入訓練好的模型對圖片進行推論，顯示框選結果與信心度',
    thumbnail: '/images/inference.png',
  },
];

const features = [
  {
    icon: Monitor,
    title: '圖形化介面',
    description: '無需指令列，所有操作皆可透過直觀的 GUI 完成',
  },
  {
    icon: Video,
    title: '影片擷取',
    description: '從影片自動截取 frame，支援 ROI 設定與灰階轉換',
  },
  {
    icon: ImageIcon,
    title: '圖像標註',
    description: '內建標註工具，支援 YOLO 格式輸出',
  },
];

export function DemoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Video playback state (reserved for future video support)
  // const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const currentItem = demoItems[currentIndex];

  useEffect(() => {
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

    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % demoItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + demoItems.length) % demoItems.length);
  };

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-orange-500 text-sm font-medium mb-4">
            功能示範
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            探索軟體功能
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            直觀的介面設計，讓 YOLO 訓練變得簡單有趣
          </p>
        </div>

        <div ref={galleryRef} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50">
              <div className="aspect-video relative">
                <img
                  src={currentItem.thumbnail}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                      截圖
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {currentItem.title}
                  </h3>
                  <p className="text-gray-300">{currentItem.description}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {demoItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`
                    flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all
                    ${currentIndex === index
                      ? 'border-orange-500 ring-2 ring-orange-500/30'
                      : 'border-white/10 hover:border-white/30'}
                  `}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-white mb-6">
              核心功能
            </h3>
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-xl glass border border-white/5 hover:border-orange-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
              <h4 className="text-white font-medium mb-2">更多功能</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  自動產生 data.yaml
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  即時訓練日誌
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  進度條追蹤
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  模型推論測試
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
