'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Loader2, CheckCircle2, AlertCircle, Mail } from 'lucide-react'

type VerifyState = 'loading' | 'success' | 'error' | 'no-token'

export function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [state, setState] = useState<VerifyState>(token ? 'loading' : 'no-token')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (!token) return

    const verify = async () => {
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        if (!res.ok) {
          const body = await res.json()
          setErrorMessage(body.error ?? '驗證失敗')
          setState('error')
          return
        }

        setState('success')
      } catch {
        setErrorMessage('驗證失敗，請稍後再試')
        setState('error')
      }
    }

    verify()
  }, [token])

  if (state === 'loading') {
    return (
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">
        <CardHeader className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-2" />
          <CardTitle className="text-2xl font-display">驗證中...</CardTitle>
          <CardDescription>
            正在驗證你的 Email，請稍候
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (state === 'success') {
    return (
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">
        <CardHeader className="text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <CardTitle className="text-2xl font-display">驗證成功</CardTitle>
          <CardDescription>
            你的 Email 已成功驗證，現在可以使用完整功能。
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

  if (state === 'error') {
    return (
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">
        <CardHeader className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-2" />
          <CardTitle className="text-2xl font-display">驗證失敗</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/login" className="text-sm text-primary hover:underline">
            返回登入
          </Link>
        </CardFooter>
      </Card>
    )
  }

  // no-token state
  return (
    <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">
      <CardHeader className="text-center">
        <Mail className="w-12 h-12 text-orange-500 mx-auto mb-2" />
        <CardTitle className="text-2xl font-display">檢查你的信箱</CardTitle>
        <CardDescription>
          我們已經發送驗證連結到你的 Email。
          請點擊信件中的連結完成驗證。
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground">
          沒有收到信件？請檢查垃圾信件夾，或稍後再試。
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/login" className="text-sm text-primary hover:underline">
          返回登入
        </Link>
      </CardFooter>
    </Card>
  )
}
