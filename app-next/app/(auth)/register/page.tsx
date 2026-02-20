import type { Metadata } from 'next'
import { RegisterForm } from './register-form'

export const metadata: Metadata = {
  title: '註冊',
  description: '建立 YOLO Trainer 帳號，免費開始訓練 AI 物件偵測模型。',
}

export default function RegisterPage() {
  return <RegisterForm />
}
