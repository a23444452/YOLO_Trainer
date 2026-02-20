import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '關於我們',
  description: '了解 YOLO Trainer 的使命、願景和團隊。',
}

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <Image src="/logo.svg" alt="YOLO Trainer" width={64} height={64} />
        </div>
        <h1 className="text-4xl font-display font-bold">關於 YOLO Trainer</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          讓每個人都能輕鬆訓練 AI 物件偵測模型，無需任何程式碼。
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold">我們的使命</h2>
        <p className="text-muted-foreground leading-relaxed">
          YOLO Trainer 誕生於一個簡單的信念：AI 物件偵測技術不應該只屬於懂程式的人。
          我們相信，透過直覺的圖形化介面，任何人都能在自己的電腦上訓練出高品質的 YOLO 模型，
          無論是製造業品質檢測、農業病蟲害辨識、還是安全監控場景。
        </p>
        <p className="text-muted-foreground leading-relaxed">
          我們的目標是消除技術門檻，讓領域專家能專注於他們最擅長的事——
          定義問題和準備資料，而不是花時間學習 Python 和 PyTorch。
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold">核心價值</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: '簡單至上',
              description: '複雜的 AI 訓練流程，透過精心設計的介面變得人人可用。一鍵完成從資料標註到模型輸出。',
            },
            {
              title: '本機優先',
              description: '您的資料不會離開您的電腦。所有訓練在本機完成，確保資料隱私和安全。',
            },
            {
              title: '開源精神',
              description: '核心訓練引擎基於開源的 Ultralytics YOLO 生態系，支援 YOLOv5、YOLOv8 和 YOLOv11。',
            },
          ].map((value) => (
            <div key={value.title} className="p-6 rounded-xl border border-border/50 bg-card/50">
              <h3 className="text-lg font-display font-bold mb-3">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold">技術支援</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-border/50 bg-card/50">
            <h3 className="font-display font-bold mb-2">支援的模型</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>YOLOv5 - 經典穩定版</li>
              <li>YOLOv8 - 最新一代架構</li>
              <li>YOLOv11 - 前沿效能</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-border/50 bg-card/50">
            <h3 className="font-display font-bold mb-2">支援的任務</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>物件偵測 (Object Detection)</li>
              <li>影像分類 (Image Classification)</li>
              <li>實例分割 (Instance Segmentation)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="text-center space-y-4 py-8 rounded-2xl border border-border/50 bg-card/30">
        <h2 className="text-2xl font-display font-bold">有任何問題嗎？</h2>
        <p className="text-muted-foreground">
          歡迎透過聯絡表單或 Email 與我們聯繫
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
          >
            聯絡我們
          </Link>
          <Link
            href="https://github.com/a23444452/YOLO_No_Code_Training"
            target="_blank"
            className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:bg-card transition-colors"
          >
            GitHub
          </Link>
        </div>
      </section>
    </div>
  )
}
