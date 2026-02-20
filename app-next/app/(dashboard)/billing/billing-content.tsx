'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Check, Cpu, Zap, Rocket, Loader2, ExternalLink } from 'lucide-react'
import type { SubscriptionInfo, PlanName } from '@/types/stripe'

const plans: Array<{
  id: PlanName
  name: string
  icon: typeof Cpu
  price: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
}> = [
  {
    id: 'free',
    name: 'Free',
    icon: Cpu,
    price: '$0',
    period: '/月',
    description: '適合入門體驗',
    features: ['基礎訓練功能', 'YOLOv5 支援', '最多 100 張圖片', '社群支援'],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Zap,
    price: '$29',
    period: '/月',
    description: '適合專業開發者',
    features: [
      '所有 Free 功能',
      'YOLOv5 / YOLOv8 / YOLOv11',
      '無限圖片數量',
      '自動標註功能',
      '資料增強',
      'ONNX / TensorRT 匯出',
      '優先技術支援',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Rocket,
    price: '$99',
    period: '/月',
    description: '適合企業團隊',
    features: [
      '所有 Pro 功能',
      'CoreML / OpenVINO 匯出',
      'API 完整存取',
      '協作功能',
      '客製化訓練',
      'SLA 保障',
      '專屬客戶經理',
      '私有化部署選項',
    ],
    highlighted: false,
  },
]

const priceIds: Record<string, string> = {
  pro: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? '',
  enterprise: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID ?? '',
}

export function BillingContent() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)
  const [portalLoading, setPortalLoading] = useState(false)

  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const res = await fetch('/api/subscription')
        if (res.ok) {
          const data = await res.json()
          setSubscription(data)
        }
      } catch {
        // Fall back to free
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [])

  const handleCheckout = async (planId: PlanName) => {
    if (planId === 'free') return

    setCheckoutLoading(planId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: priceIds[planId] }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      // Error handled silently
    } finally {
      setCheckoutLoading(null)
    }
  }

  const handlePortal = async () => {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      // Error handled silently
    } finally {
      setPortalLoading(false)
    }
  }

  if (!session?.user) {
    router.push('/login?callbackUrl=/billing')
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          方案管理
        </h1>
        <p className="text-muted-foreground mt-1">
          管理你的訂閱方案和付款資訊
        </p>
      </div>

      {success && (
        <Card className="border-green-500/50 bg-green-500/10">
          <CardContent className="pt-6">
            <p className="text-green-400 text-center">
              訂閱成功！感謝你的支持。你的方案將在幾秒內生效。
            </p>
          </CardContent>
        </Card>
      )}

      {canceled && (
        <Card className="border-yellow-500/50 bg-yellow-500/10">
          <CardContent className="pt-6">
            <p className="text-yellow-400 text-center">
              結帳已取消。你可以隨時重新選擇方案。
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && subscription && subscription.plan !== 'free' && (
        <>
          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle>目前訂閱</CardTitle>
              <CardDescription>你目前的方案和帳單資訊</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">方案</span>
                <span className="font-semibold text-orange-500 capitalize">
                  {subscription.plan}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">狀態</span>
                <span className="font-semibold text-green-400">
                  {subscription.status === 'active' ? '啟用中' : subscription.status}
                </span>
              </div>
              {subscription.currentPeriodEnd && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">下次帳單日</span>
                    <span className="font-semibold">
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString('zh-TW')}
                    </span>
                  </div>
                </>
              )}
              {subscription.cancelAtPeriodEnd && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">注意</span>
                    <span className="text-yellow-400 text-sm">
                      將在目前計費週期結束時取消
                    </span>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePortal}
                disabled={portalLoading}
                variant="outline"
                className="w-full"
              >
                {portalLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                管理訂閱
              </Button>
            </CardFooter>
          </Card>
          <Separator />
        </>
      )}

      <div>
        <h2 className="font-display text-xl font-bold text-foreground mb-4">
          {subscription?.plan === 'free' || !subscription ? '選擇方案' : '變更方案'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = subscription?.plan === plan.id
            const PlanIcon = plan.icon

            return (
              <Card
                key={plan.id}
                className={`border-border/50 bg-card/80 backdrop-blur relative ${
                  plan.highlighted ? 'border-orange-500/50 ring-1 ring-orange-500/20' : ''
                }`}
              >
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    目前方案
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PlanIcon className={`w-5 h-5 ${plan.highlighted ? 'text-orange-500' : 'text-gray-400'}`} />
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-2">
                    <span className="font-display text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {isCurrentPlan ? (
                    <Button disabled variant="outline" className="w-full">
                      目前方案
                    </Button>
                  ) : plan.id === 'free' ? (
                    <Button disabled variant="outline" className="w-full">
                      免費方案
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleCheckout(plan.id)}
                      disabled={!!checkoutLoading || isLoading}
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : ''
                      }`}
                    >
                      {checkoutLoading === plan.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : null}
                      {isCurrentPlan ? '目前方案' : '升級'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        所有付費方案均包含 14 天免費試用，隨時可以取消
      </p>
    </div>
  )
}
