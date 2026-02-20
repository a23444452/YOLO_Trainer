'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, MessageCircle, Youtube, Download, Loader2, CheckCircle2 } from 'lucide-react'

const footerLinks = {
  product: {
    title: '產品',
    links: [
      { label: '功能特色', href: '/#features' },
      { label: '下載軟體', href: '/#download' },
      { label: '系統需求', href: '/#download' },
      { label: '更新日誌', href: 'https://github.com/a23444452/YOLO_No_Code_Training/releases', external: true },
    ],
  },
  resources: {
    title: '資源',
    links: [
      { label: '使用教學', href: 'https://github.com/a23444452/YOLO_No_Code_Training#readme', external: true },
      { label: 'API 文件', href: 'https://github.com/a23444452/YOLO_No_Code_Training', external: true },
      { label: '常見問題', href: '/faq' },
      { label: '社群論壇', href: 'https://github.com/a23444452/YOLO_No_Code_Training/discussions', external: true },
    ],
  },
  company: {
    title: '公司',
    links: [
      { label: '關於我們', href: '/about' },
      { label: '聯絡我們', href: '/#contact' },
    ],
  },
  legal: {
    title: '法律',
    links: [
      { label: '服務條款', href: '/terms' },
      { label: '隱私政策', href: '/privacy' },
      { label: '授權協議', href: 'https://github.com/a23444452/YOLO_No_Code_Training/blob/main/LICENSE', external: true },
    ],
  },
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/a23444452/YOLO_No_Code_Training', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

type NewsletterState = 'idle' | 'loading' | 'success' | 'error'

export function Footer() {
  const [email, setEmail] = useState('')
  const [newsletterState, setNewsletterState] = useState<NewsletterState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setNewsletterState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const body = await res.json()
        setErrorMessage(body.error ?? '訂閱失敗')
        setNewsletterState('error')
        return
      }

      setNewsletterState('success')
      setEmail('')
    } catch {
      setErrorMessage('訂閱失敗，請稍後再試')
      setNewsletterState('error')
    }
  }

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <Image src="/logo.svg" alt="YOLO Trainer" width={32} height={32} className="w-8 h-8" />
              <span className="font-display font-bold text-lg tracking-wide text-white">
                YOLO TRAINER
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              無需程式碼即可在本機訓練 YOLO 物件偵測模型。
              支援 YOLOv5、YOLOv8 與 YOLOv11。
            </p>
            <a
              href="/#download"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              免費下載
            </a>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-display font-bold text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 text-sm hover:text-orange-500 transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 text-sm hover:text-orange-500 transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 lg:p-8 mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display text-xl font-bold text-white mb-2">
                訂閱我們的電子報
              </h4>
              <p className="text-gray-400 text-sm">
                獲取最新版本更新、教學與 AI 物件偵測技術資訊
              </p>
            </div>
            {newsletterState === 'success' ? (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">訂閱成功！感謝您的訂閱。</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 lg:w-64 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={newsletterState === 'loading'}
                    className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {newsletterState === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      '訂閱'
                    )}
                  </button>
                </div>
                {newsletterState === 'error' && (
                  <p className="text-red-400 text-xs mt-2">{errorMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} YOLO Trainer. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
              服務條款
            </Link>
            <Link href="/privacy" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
              隱私政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
