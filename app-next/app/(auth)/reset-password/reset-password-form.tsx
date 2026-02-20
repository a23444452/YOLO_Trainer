'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: token ?? '' },
  })

  if (!token) {
    return (
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">
        <CardHeader className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-2" />
          <CardTitle className="text-2xl font-display">無效的連結</CardTitle>
          <CardDescription>
            此重設密碼連結無效或已過期。
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            重新申請重設密碼
          </Link>
        </CardFooter>
      </Card>
    )
  }

  const onSubmit = async (data: ResetPasswordInput) => {
    setError(null)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: data.token,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      })

      if (!res.ok) {
        const body = await res.json()
        setError(body.error ?? '重設失敗')
        return
      }

      setSuccess(true)
    } catch {
      setError('重設失敗，請稍後再試')
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">
        <CardHeader className="text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <CardTitle className="text-2xl font-display">密碼已重設</CardTitle>
          <CardDescription>
            你的密碼已成功更新，請使用新密碼登入。
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button asChild>
            <Link href="/login">前往登入</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-display text-gradient">
          重設密碼
        </CardTitle>
        <CardDescription>
          請輸入你的新密碼
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...register('token')} />

          <div className="space-y-2">
            <Label htmlFor="password">新密碼</Label>
            <Input
              id="password"
              type="password"
              placeholder="至少 8 個字元"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">確認新密碼</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="再次輸入密碼"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            重設密碼
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
