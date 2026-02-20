'use client'

import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tag,
  Cpu,
  Video,
  FolderOpen,
  BarChart3,
  Check
} from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap'

const features = [
  {
    id: 'video',
    icon: Video,
    title: '影片擷取',
    description: '從影片自動截取 frame，支援固定間隔或手動截取模式。可設定 ROI 區域，並選擇輸出為灰階格式。',
    image: '/images/video-capture.png',
    highlights: [
      '固定間隔截取',
      '手動 Space 截取',
      'ROI 區域設定',
      '灰階輸出選項',
    ],
  },
  {
    id: 'labeling',
    icon: Tag,
    title: '圖像標註',
    description: '內建完整的圖像標註工具，支援繪製邊界框、調整、刪除等操作。標註結果自動儲存為 YOLO 格式，可直接用於訓練。',
    image: '/images/labeling.png',
    highlights: [
      '滑鼠拖曳繪製 ROI',
      '類別管理與選擇',
      '框選調整與移動',
      'YOLO 格式輸出',
    ],
  },
  {
    id: 'dataset',
    icon: FolderOpen,
    title: '資料集製作',
    description: '自動將圖片與標籤檔分類為訓練集與驗證集，自動產生 data.yaml 設定檔，簡化資料準備流程。',
    image: '/images/dataset.png',
    highlights: [
      '自動分類',
      'data.yaml 產生',
      '格式驗證',
      '批次處理',
    ],
  },
  {
    id: 'training',
    icon: BarChart3,
    title: '模型訓練',
    description: '支援 YOLOv5、YOLOv8、YOLOv11 訓練，可調整 Epochs、Batch Size、Learning Rate 等超參數，即時監控訓練進度。',
    image: '/images/training.png',
    highlights: [
      '多版本支援',
      '超參數調整',
      '即時日誌',
      '進度條追蹤',
    ],
  },
  {
    id: 'inference',
    icon: Cpu,
    title: '模型推論',
    description: '載入訓練好的模型對圖片進行推論，可調整信心度與 IOU 閾值，直接在介面上顯示框選結果與信心度。',
    image: '/images/inference.png',
    highlights: [
      '即時推論',
      '閾值調整',
      '結果視覺化',
      '批次處理',
    ],
  },
];

export function Features() {
  const [activeTab, setActiveTab] = useState('video');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const activeFeature = features.find((f) => f.id === activeTab) || features[0];

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

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { rotateY: -90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-orange-500 text-sm font-medium mb-4">
            功能特色
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            完整的 YOLO 訓練工具鏈
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            從資料準備到模型部署，一站式解決方案
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div ref={contentRef}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-col w-full gap-3 bg-transparent h-auto">
                {features.map((feature) => (
                  <TabsTrigger
                    key={feature.id}
                    value={feature.id}
                    className={`
                      w-full p-4 rounded-xl text-left transition-all duration-500
                      data-[state=active]:bg-white/10 data-[state=active]:border-orange-500/50
                      border border-white/5 hover:border-white/20 hover:bg-white/5
                      data-[state=inactive]:opacity-60
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500
                        ${activeTab === feature.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-white/10 text-gray-400'}
                      `}>
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div
            className="relative lg:sticky lg:top-32"
            style={{ perspective: '1000px' }}
          >
            <div
              ref={imageRef}
              className="relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-3xl blur-2xl" />

              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  className="w-full h-auto transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <activeFeature.icon className="w-5 h-5 text-orange-500" />
                      <span className="text-white font-medium">{activeFeature.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeFeature.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs"
                        >
                          <Check className="w-3 h-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
