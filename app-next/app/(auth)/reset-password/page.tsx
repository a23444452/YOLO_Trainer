import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ResetPasswordForm } from './reset-password-form'
import { Loader2 } from 'lucide-react'

export const metadata: Metadata = {
  title: '重設密碼',
  description: '設定新的 YOLO Trainer 帳號密碼。',
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-primary" />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
