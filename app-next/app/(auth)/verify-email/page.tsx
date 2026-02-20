import type { Metadata } from 'next'
import { Suspense } from 'react'
import { VerifyEmailContent } from './verify-email-content'
import { Loader2 } from 'lucide-react'

export const metadata: Metadata = {
  title: '驗證 Email',
  description: '驗證你的 YOLO Trainer 帳號 Email。',
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-primary" />}>
      <VerifyEmailContent />
    </Suspense>
  )
}
