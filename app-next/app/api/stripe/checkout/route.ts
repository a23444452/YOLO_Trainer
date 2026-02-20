import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getStripe, getAllowedPriceIds } from '@/lib/stripe'
import { checkoutSchema } from '@/lib/validations/stripe'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, 'checkout')
  if (limited) return limited

  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '請先登入' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validated = checkoutSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: '無效的請求參數' },
        { status: 400 }
      )
    }

    const { priceId } = validated.data

    const allowedPriceIds = getAllowedPriceIds()
    if (!allowedPriceIds.includes(priceId)) {
      return NextResponse.json(
        { error: '無效的方案' },
        { status: 400 }
      )
    }

    const stripe = getStripe()

    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1)

    if (!dbUser) {
      return NextResponse.json(
        { error: '找不到使用者' },
        { status: 404 }
      )
    }

    let customerId = dbUser.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: dbUser.email,
        name: dbUser.name ?? undefined,
        metadata: { userId: dbUser.id },
      })
      customerId = customer.id

      await db
        .update(users)
        .set({ stripeCustomerId: customerId, updatedAt: new Date() })
        .where(eq(users.id, dbUser.id))
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/billing?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/billing?canceled=true`,
      subscription_data: {
        trial_period_days: 14,
        metadata: { userId: dbUser.id },
      },
      metadata: { userId: dbUser.id },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: '建立結帳連結失敗' },
      { status: 500 }
    )
  }
}
