import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, '請輸入姓名').max(100, '姓名過長'),
  email: z.string().email('請輸入有效的電子郵件'),
  subject: z.string().min(1, '請輸入主旨').max(200, '主旨過長'),
  message: z.string().min(10, '訊息至少 10 個字').max(5000, '訊息過長'),
})

export type ContactInput = z.infer<typeof contactSchema>
