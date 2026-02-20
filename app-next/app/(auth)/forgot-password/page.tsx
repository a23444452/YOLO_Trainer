import type { Metadata } from 'next'
import { ForgotPasswordForm } from './forgot-password-form'

export const metadata: Metadata = {
  title: '忘記密碼',
  description: '重設你的 YOLO Trainer 帳號密碼。',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
