import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { subscriptions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import type { SubscriptionInfo } from '@/types/stripe'
import { rateLimit } from '@/lib/rate-limit'

export async function GET(req: NextRequest) {
  const limited = await rateLimit(req, 'subscription')
  if (limited) return limited

  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '請先登入' },
        { status: 401 }
      )
    }

    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, session.user.id))
      .limit(1)

    if (!sub || !['active', 'trialing'].includes(sub.status)) {
      const info: SubscriptionInfo = {
        plan: 'free',
        status: 'active',
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
      }
      return NextResponse.json(info)
    }

    const proPriceId = process.env.STRIPE_PRO_PRICE_ID
    const enterprisePriceId = process.env.STRIPE_ENTERPRISE_PRICE_ID

    let plan: SubscriptionInfo['plan'] = 'free'
    if (sub.stripePriceId === enterprisePriceId) plan = 'enterprise'
    else if (sub.stripePriceId === proPriceId) plan = 'pro'

    const info: SubscriptionInfo = {
      plan,
      status: sub.status,
      currentPeriodEnd: sub.currentPeriodEnd.toISOString(),
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    }

    return NextResponse.json(info)
  } catch (error) {
    console.error('Subscription fetch error:', error)
    return NextResponse.json(
      { error: '取得訂閱資訊失敗' },
      { status: 500 }
    )
  }
}
