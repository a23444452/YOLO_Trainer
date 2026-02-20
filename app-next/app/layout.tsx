import type { Metadata } from 'next'
import { Inter_Tight, Oswald } from 'next/font/google'
import { SessionProvider } from '@/components/providers/SessionProvider'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const siteUrl = process.env.NEXTAUTH_URL ?? 'https://yolotrainer.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'YOLO Trainer - No-Code AI Training Platform',
    template: '%s | YOLO Trainer',
  },
  description:
    '免寫程式訓練 YOLO 物件偵測模型。支援 YOLOv5 / YOLOv8 / YOLOv11，提供自動標註、資料增強、模型匯出等全流程 AI 訓練工具。免費下載桌面應用程式。',
  keywords: [
    'YOLO', 'YOLOv8', 'YOLOv11', '物件偵測', 'AI 訓練',
    'No-Code', '自動標註', '深度學習', 'Object Detection',
    'Machine Learning', 'Computer Vision',
  ],
  authors: [{ name: 'YOLO Trainer Team' }],
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: siteUrl,
    siteName: 'YOLO Trainer',
    title: 'YOLO Trainer - No-Code AI 物件偵測訓練平台',
    description:
      '免寫程式訓練 YOLO 物件偵測模型。支援 YOLOv5 / YOLOv8 / YOLOv11，提供全流程 AI 訓練工具。',
    images: [
      {
        url: '/images/hero-dashboard.jpg',
        width: 1200,
        height: 630,
        alt: 'YOLO Trainer Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YOLO Trainer - No-Code AI 物件偵測訓練平台',
    description:
      '免寫程式訓練 YOLO 物件偵測模型。支援 YOLOv5 / YOLOv8 / YOLOv11。',
    images: ['/images/hero-dashboard.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" className="dark">
      <body className={`${interTight.variable} ${oswald.variable} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
