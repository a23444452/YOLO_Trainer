import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '隱私政策',
  description: 'YOLO Trainer 隱私政策，說明我們如何收集、使用和保護您的個人資料。',
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-invert prose-orange max-w-none">
      <h1>隱私政策</h1>
      <p className="text-muted-foreground">最後更新日期：2025 年 1 月 1 日</p>

      <h2>1. 資料收集</h2>
      <p>我們收集以下類型的資料：</p>

      <h3>您提供的資料</h3>
      <ul>
        <li><strong>帳號資訊</strong>：Email、姓名、密碼（加密儲存）</li>
        <li><strong>付款資訊</strong>：透過 Stripe 處理，我們不直接儲存信用卡號碼</li>
        <li><strong>聯絡資訊</strong>：透過聯絡表單提交的姓名、Email 和訊息</li>
        <li><strong>電子報</strong>：訂閱電子報時提供的 Email</li>
      </ul>

      <h3>自動收集的資料</h3>
      <ul>
        <li><strong>使用資料</strong>：瀏覽頁面、功能使用情況</li>
        <li><strong>裝置資訊</strong>：瀏覽器類型、作業系統、螢幕解析度</li>
        <li><strong>Cookie</strong>：用於維持登入狀態和改善使用體驗</li>
      </ul>

      <h2>2. 資料使用目的</h2>
      <p>我們使用您的資料用於：</p>
      <ul>
        <li>提供和維護本服務</li>
        <li>處理帳號註冊和身份驗證</li>
        <li>處理付款和訂閱管理</li>
        <li>發送服務通知和電子報（經您同意）</li>
        <li>改善服務品質和使用者體驗</li>
        <li>回應您的詢問和支援請求</li>
      </ul>

      <h2>3. 資料分享</h2>
      <p>我們不會出售您的個人資料。我們僅在以下情況分享資料：</p>
      <ul>
        <li><strong>服務提供商</strong>：Stripe（付款處理）、Supabase（資料庫託管）、Vercel（網站託管）、Resend（Email 發送）</li>
        <li><strong>法律要求</strong>：在法律要求或為保護權利、安全時</li>
        <li><strong>經您同意</strong>：在取得您明確同意後</li>
      </ul>

      <h2>4. 資料安全</h2>
      <p>
        我們採取適當的技術和組織措施保護您的資料，包括：
      </p>
      <ul>
        <li>密碼使用 bcrypt 加密儲存</li>
        <li>所有網路傳輸使用 HTTPS/TLS 加密</li>
        <li>API 端點實施速率限制防止濫用</li>
        <li>定期審查和更新安全措施</li>
      </ul>

      <h2>5. Cookie 政策</h2>
      <p>我們使用以下類型的 Cookie：</p>
      <ul>
        <li><strong>必要 Cookie</strong>：維持登入狀態和安全性（無法停用）</li>
        <li><strong>功能 Cookie</strong>：記住您的偏好設定</li>
        <li><strong>分析 Cookie</strong>：了解網站使用情況以改善服務</li>
      </ul>

      <h2>6. 您的權利</h2>
      <p>您擁有以下權利：</p>
      <ul>
        <li><strong>存取權</strong>：要求查看我們持有的您的個人資料</li>
        <li><strong>更正權</strong>：要求更正不正確的資料</li>
        <li><strong>刪除權</strong>：要求刪除您的帳號和相關資料</li>
        <li><strong>可攜權</strong>：要求以通用格式匯出您的資料</li>
        <li><strong>反對權</strong>：反對我們處理您的資料用於行銷目的</li>
      </ul>
      <p>
        如要行使這些權利，請透過{' '}
        <a href="mailto:privacy@yolotrainer.com">privacy@yolotrainer.com</a>{' '}
        聯絡我們。
      </p>

      <h2>7. 資料保留</h2>
      <p>
        我們會在您的帳號有效期間保留您的資料。帳號刪除後，
        我們會在 30 天內刪除您的個人資料，
        但可能保留匿名化的統計數據。
      </p>

      <h2>8. 兒童隱私</h2>
      <p>
        本服務不針對 16 歲以下的兒童。我們不會故意收集兒童的個人資料。
        如果您發現我們收集了兒童的資料，請立即聯絡我們。
      </p>

      <h2>9. 政策更新</h2>
      <p>
        我們可能會更新本隱私政策。重大變更將透過 Email 或網站通知您。
        繼續使用本服務即表示您接受更新後的政策。
      </p>

      <h2>10. 聯絡方式</h2>
      <p>
        如對隱私政策有任何疑問，請聯絡：
      </p>
      <ul>
        <li>Email：<a href="mailto:privacy@yolotrainer.com">privacy@yolotrainer.com</a></li>
      </ul>
    </article>
  )
}
