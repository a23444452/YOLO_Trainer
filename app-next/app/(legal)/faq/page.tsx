import type { Metadata } from 'next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: '常見問題',
  description: 'YOLO Trainer 常見問題與解答。',
}

const faqs = [
  {
    category: '一般問題',
    items: [
      {
        q: 'YOLO Trainer 是什麼？',
        a: 'YOLO Trainer 是一款無需程式碼即可在本機訓練 YOLO 物件偵測模型的桌面應用程式。支援 YOLOv5、YOLOv8 和 YOLOv11，提供從資料標註、模型訓練到推論部署的完整工作流程。',
      },
      {
        q: '需要會寫程式才能使用嗎？',
        a: '完全不需要。YOLO Trainer 提供直覺的圖形化介面，所有操作都可以透過滑鼠點擊完成。您只需要準備訓練圖片，剩下的交給我們。',
      },
      {
        q: '支援哪些作業系統？',
        a: '目前支援 Windows 10/11 和 macOS（Intel 和 Apple Silicon）。Linux 版本正在開發中。',
      },
      {
        q: '我的資料會上傳到雲端嗎？',
        a: '不會。所有的資料處理和模型訓練都在您的本機電腦上完成，您的資料不會離開您的設備。',
      },
    ],
  },
  {
    category: '訓練相關',
    items: [
      {
        q: '需要什麼硬體配備？',
        a: '建議至少 8GB RAM 和支援 CUDA 的 NVIDIA 顯示卡（GTX 1060 以上）。沒有獨立顯卡也可以使用 CPU 訓練，但速度會較慢。Apple Silicon Mac 可使用 MPS 加速。',
      },
      {
        q: '需要多少訓練圖片？',
        a: '一般建議每個類別至少 100-300 張標註圖片以獲得基本效果。更多高品質的標註資料通常能帶來更好的模型表現。',
      },
      {
        q: '訓練需要多久？',
        a: '取決於資料集大小、模型架構和硬體配備。小型資料集（幾百張）使用 GPU 通常在 30 分鐘到 2 小時內完成。',
      },
      {
        q: '支援哪些標註格式？',
        a: '支援 YOLO 格式（txt）、COCO JSON、Pascal VOC（XML）等主流標註格式。也內建標註工具，可以直接在應用程式內標註。',
      },
      {
        q: '可以使用預訓練模型嗎？',
        a: '可以。支援使用 COCO 預訓練權重作為起點進行遷移學習（Transfer Learning），這能大幅減少所需的訓練資料和時間。',
      },
    ],
  },
  {
    category: '方案與付費',
    items: [
      {
        q: '免費方案有什麼限制？',
        a: '免費方案可以使用基本的標註和訓練功能，支援最多 3 個專案和基本模型架構。',
      },
      {
        q: 'Pro 和 Enterprise 方案有什麼差異？',
        a: 'Pro 方案（$29/月）提供無限專案、進階模型架構和優先技術支援。Enterprise 方案（$99/月）額外提供團隊協作、API 存取和專屬客服。',
      },
      {
        q: '有免費試用嗎？',
        a: '有。所有付費方案都提供 14 天免費試用，試用期間可使用方案的完整功能。',
      },
      {
        q: '如何取消訂閱？',
        a: '登入後前往「帳單」頁面，點擊「管理訂閱」即可取消。取消後可繼續使用至當期結束。',
      },
    ],
  },
  {
    category: '技術支援',
    items: [
      {
        q: '遇到問題要怎麼求助？',
        a: '您可以透過聯絡表單、Email（support@yolotrainer.com）或 GitHub Issues 回報問題。付費用戶享有優先回覆。',
      },
      {
        q: '訓練好的模型可以在哪裡使用？',
        a: '訓練完成的模型輸出為標準的 ONNX 或 PyTorch 格式，可用於任何支援這些格式的推論框架，包括 web 應用、手機 app 或嵌入式裝置。',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold">常見問題</h1>
        <p className="text-muted-foreground text-lg">
          找不到你要的答案？歡迎<a href="/#contact" className="text-orange-500 hover:underline">聯絡我們</a>。
        </p>
      </section>

      {faqs.map((section) => (
        <section key={section.category} className="space-y-4">
          <h2 className="text-xl font-display font-bold">{section.category}</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {section.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`${section.category}-${i}`}
                className="border border-border/50 rounded-lg px-4 bg-card/30"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ))}
    </div>
  )
}
