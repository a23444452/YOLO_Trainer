import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from '@/lib/validations/auth'

describe('loginSchema', () => {
  it('should accept valid login input', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '12345678',
    })
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: '12345678',
    })
    expect(result.success).toBe(false)
  })

  it('should reject short password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '1234567',
    })
    expect(result.success).toBe(false)
  })

  it('should reject empty email', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: '12345678',
    })
    expect(result.success).toBe(false)
  })
})

describe('registerSchema', () => {
  it('should accept valid registration input', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      password: '12345678',
      confirmPassword: '12345678',
    })
    expect(result.success).toBe(true)
  })

  it('should reject mismatched passwords', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      password: '12345678',
      confirmPassword: '87654321',
    })
    expect(result.success).toBe(false)
  })

  it('should reject empty name', () => {
    const result = registerSchema.safeParse({
      name: '',
      email: 'test@example.com',
      password: '12345678',
      confirmPassword: '12345678',
    })
    expect(result.success).toBe(false)
  })
})

describe('forgotPasswordSchema', () => {
  it('should accept valid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'test@example.com' })
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'not-email' })
    expect(result.success).toBe(false)
  })

  it('should reject empty email', () => {
    const result = forgotPasswordSchema.safeParse({ email: '' })
    expect(result.success).toBe(false)
  })
})

describe('resetPasswordSchema', () => {
  it('should accept valid reset input', () => {
    const result = resetPasswordSchema.safeParse({
      token: 'abc123',
      password: '12345678',
      confirmPassword: '12345678',
    })
    expect(result.success).toBe(true)
  })

  it('should reject mismatched passwords', () => {
    const result = resetPasswordSchema.safeParse({
      token: 'abc123',
      password: '12345678',
      confirmPassword: '87654321',
    })
    expect(result.success).toBe(false)
  })

  it('should reject empty token', () => {
    const result = resetPasswordSchema.safeParse({
      token: '',
      password: '12345678',
      confirmPassword: '12345678',
    })
    expect(result.success).toBe(false)
  })

  it('should reject short password', () => {
    const result = resetPasswordSchema.safeParse({
      token: 'abc123',
      password: '1234',
      confirmPassword: '1234',
    })
    expect(result.success).toBe(false)
  })
})
