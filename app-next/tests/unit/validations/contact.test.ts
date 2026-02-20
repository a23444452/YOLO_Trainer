import { describe, it, expect } from 'vitest'
import { contactSchema } from '@/lib/validations/contact'

describe('contactSchema', () => {
  it('should accept valid contact input', () => {
    const result = contactSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough chars.',
    })
    expect(result.success).toBe(true)
  })

  it('should reject empty name', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough chars.',
    })
    expect(result.success).toBe(false)
  })

  it('should reject invalid email', () => {
    const result = contactSchema.safeParse({
      name: 'Test User',
      email: 'not-an-email',
      subject: 'Test Subject',
      message: 'This is a test message with enough chars.',
    })
    expect(result.success).toBe(false)
  })

  it('should reject short message', () => {
    const result = contactSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Too short',
    })
    expect(result.success).toBe(false)
  })

  it('should reject empty subject', () => {
    const result = contactSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      subject: '',
      message: 'This is a test message with enough chars.',
    })
    expect(result.success).toBe(false)
  })

  it('should reject name exceeding max length', () => {
    const result = contactSchema.safeParse({
      name: 'a'.repeat(101),
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough chars.',
    })
    expect(result.success).toBe(false)
  })
})
