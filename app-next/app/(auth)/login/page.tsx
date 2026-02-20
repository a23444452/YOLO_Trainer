import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from './login-form'
import { Loader2 } from 'lucide-react'

export const metadata: Metadata = {
  title: '登入',
  description: '登入 YOLO Trainer 帳號，開始訓練你的 AI 物件偵測模型。',
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-primary" />}>
      <LoginForm />
    </Suspense>
  )
}
