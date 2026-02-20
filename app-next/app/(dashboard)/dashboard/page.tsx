import type { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Cpu, Zap, Rocket } from 'lucide-react'
import type { SubscriptionTier } from '@/types/auth'

export const metadata: Metadata = {
  title: '儀表板',
  description: '管理你的 YOLO Trainer 帳號、訓練任務和訂閱方案。',
}

const tierConfig: Record<SubscriptionTier, { icon: typeof Cpu; label: string; color: string }> = {
  free: { icon: Cpu, label: 'Free', color: 'text-gray-400' },
  pro: { icon: Zap, label: 'Pro', color: 'text-orange-500' },
  enterprise: { icon: Rocket, label: 'Enterprise', color: 'text-purple-500' },
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const tier = session.user.tier ?? 'free'
  const config = tierConfig[tier]
  const TierIcon = config.icon

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          歡迎回來，{session.user.name ?? '使用者'}
        </h1>
        <p className="text-muted-foreground mt-1">
          管理你的 YOLO Trainer 帳號和訓練任務
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardDescription>目前方案</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <TierIcon className={`w-5 h-5 ${config.color}`} />
              <span className={config.color}>{config.label}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tier === 'free' ? (
              <Button asChild size="sm" className="w-full">
                <Link href="/billing">升級方案</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/billing">管理方案</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardDescription>訓練次數</CardDescription>
            <CardTitle>0 / {tier === 'free' ? '5' : '∞'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {tier === 'free' ? '升級以獲得無限訓練次數' : '無限制使用'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardDescription>模型數量</CardDescription>
            <CardTitle>0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">尚未建立任何模型</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>快速開始</CardTitle>
          <CardDescription>
            YOLO Trainer 桌面應用程式即將推出
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            訓練功能目前正在開發中。請先完成帳號設定和方案選擇，
            我們會在桌面應用程式上線時通知您。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
