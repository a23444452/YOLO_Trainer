import type { Metadata } from 'next'
import { GSAPProvider } from '@/components/providers/GSAPProvider'
import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { LogoCarousel } from '@/components/sections/LogoCarousel'
import { Features } from '@/components/sections/Features'
import { DownloadSection } from '@/components/sections/DownloadSection'
import { DemoGallery } from '@/components/sections/DemoGallery'
import { Pricing } from '@/components/sections/Pricing'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'YOLO Trainer - No-Code AI 物件偵測訓練平台',
  description:
    '免寫程式訓練 YOLO 物件偵測模型。支援 YOLOv5 / YOLOv8 / YOLOv11，提供自動標註、資料增強、模型匯出等全流程 AI 訓練工具。',
  openGraph: {
    title: 'YOLO Trainer - No-Code AI 物件偵測訓練平台',
    description:
      '免寫程式訓練 YOLO 物件偵測模型。支援 YOLOv5 / YOLOv8 / YOLOv11，提供全流程 AI 訓練工具。',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'YOLO Trainer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YOLO Trainer - No-Code AI 物件偵測訓練平台',
    description:
      '免寫程式訓練 YOLO 物件偵測模型。支援 YOLOv5 / YOLOv8 / YOLOv11。',
  },
}

export default function Home() {
  return (
    <GSAPProvider>
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
    </GSAPProvider>
  )
}
