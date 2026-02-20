'use client'

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Check, Monitor, Cpu, HardDrive, Zap } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap'

const platforms = [
  {
    id: 'windows',
    name: 'Windows',
    icon: Monitor,
    versions: [
      { arch: 'x64', size: '245 MB', requirement: 'Windows 10/11' },
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: Monitor,
    versions: [
      { arch: 'Intel', size: '280 MB', requirement: 'macOS 11+' },
      { arch: 'Apple Silicon', size: '265 MB', requirement: 'macOS 12+' },
    ],
    color: 'from-gray-400 to-gray-500',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: Monitor,
    versions: [
      { arch: 'x64', size: '230 MB', requirement: 'Ubuntu 20.04+' },
    ],
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
];

const systemRequirements = [
  { icon: Cpu, label: '處理器', value: 'Intel Core i5 / AMD Ryzen 5 或更高' },
  { icon: HardDrive, label: '記憶體', value: '8 GB RAM（建議 16 GB）' },
  { icon: Zap, label: '顯示卡', value: 'NVIDIA GPU 支援 CUDA（建議）' },
  { icon: Monitor, label: '儲存空間', value: '至少 2 GB 可用空間' },
];

export function DownloadSection() {
  const [selectedPlatform, setSelectedPlatform] = useState('windows');
  const [isDownloading, setIsDownloading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const selectedPlatformData = platforms.find((p) => p.id === selectedPlatform);

  return (
    <section
      id="download"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-orange-500 text-sm font-medium mb-4">
            下載軟體
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            選擇你的平台，開始使用
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            免費下載基礎版本，註冊訂閱解鎖進階功能
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`
                    relative p-6 rounded-2xl border transition-all duration-300 text-left
                    ${selectedPlatform === platform.id
                      ? `${platform.bgColor} ${platform.borderColor} border-2`
                      : 'glass border-white/5 hover:border-white/20'}
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color}
                    flex items-center justify-center mb-4
                  `}>
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {platform.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {platform.versions.length} 個版本
                  </p>
                  {selectedPlatform === platform.id && (
                    <div className="absolute top-4 right-4">
                      <Check className="w-5 h-5 text-orange-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selectedPlatformData && (
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h4 className="font-display text-lg font-bold text-white mb-4">
                  選擇版本
                </h4>
                <div className="space-y-3">
                  {selectedPlatformData.versions.map((version, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`
                          w-10 h-10 rounded-lg bg-gradient-to-br ${selectedPlatformData.color}
                          flex items-center justify-center
                        `}>
                          <selectedPlatformData.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {selectedPlatformData.name} {version.arch}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {version.requirement} · {version.size}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6"
                      >
                        {isDownloading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            下載
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 h-fit">
            <h4 className="font-display text-lg font-bold text-white mb-6">
              系統需求
            </h4>
            <div className="space-y-4">
              {systemRequirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <req.icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{req.label}</div>
                    <div className="text-white text-sm">{req.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-gray-400 text-sm mb-2">當前版本</div>
              <div className="text-white font-bold text-lg">v2.1.0</div>
              <div className="text-gray-500 text-xs mt-1">發布於 2024年2月</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
