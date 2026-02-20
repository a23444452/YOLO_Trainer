import { Resend } from 'resend'

let resendInstance: Resend | null = null

function getResend(): Resend {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

function getFromEmail(): string {
  return process.env.EMAIL_FROM ?? 'YOLO Trainer <noreply@yolotrainer.com>'
}

function getSiteUrl(): string {
  return process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${getSiteUrl()}/verify-email?token=${token}`

  await getResend().emails.send({
    from: getFromEmail(),
    to: email,
    subject: '驗證你的 YOLO Trainer 帳號',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #f97316; margin-bottom: 16px;">歡迎加入 YOLO Trainer</h2>
        <p style="color: #374151; line-height: 1.6;">
          感謝你的註冊！請點擊下方按鈕驗證你的 Email 地址：
        </p>
        <a href="${verifyUrl}" style="display: inline-block; background: #f97316; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 24px 0;">
          驗證 Email
        </a>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          此連結將在 24 小時後失效。<br/>
          如果你沒有註冊 YOLO Trainer，請忽略此信件。
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #9ca3af; font-size: 12px;">
          如果按鈕無法點擊，請複製以下連結到瀏覽器：<br/>
          ${verifyUrl}
        </p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${getSiteUrl()}/reset-password?token=${token}`

  await getResend().emails.send({
    from: getFromEmail(),
    to: email,
    subject: '重設你的 YOLO Trainer 密碼',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #f97316; margin-bottom: 16px;">重設密碼</h2>
        <p style="color: #374151; line-height: 1.6;">
          我們收到了你的密碼重設請求。請點擊下方按鈕設定新密碼：
        </p>
        <a href="${resetUrl}" style="display: inline-block; background: #f97316; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 24px 0;">
          重設密碼
        </a>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          此連結將在 1 小時後失效。<br/>
          如果你沒有發起此請求，請忽略此信件，你的密碼不會被更改。
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #9ca3af; font-size: 12px;">
          如果按鈕無法點擊，請複製以下連結到瀏覽器：<br/>
          ${resetUrl}
        </p>
      </div>
    `,
  })
}
