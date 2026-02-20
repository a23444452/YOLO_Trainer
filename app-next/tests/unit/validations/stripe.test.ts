import { describe, it, expect } from 'vitest'
import { checkoutSchema } from '@/lib/validations/stripe'

describe('checkoutSchema', () => {
  it('should accept valid priceId', () => {
    const result = checkoutSchema.safeParse({
      priceId: 'price_1234567890',
    })
    expect(result.success).toBe(true)
  })

  it('should reject empty priceId', () => {
    const result = checkoutSchema.safeParse({
      priceId: '',
    })
    expect(result.success).toBe(false)
  })

  it('should reject missing priceId', () => {
    const result = checkoutSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
