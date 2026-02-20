'use client'

import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Info animation
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('送出失敗');
      }

      setIsSubmitted(true);
      e.currentTarget.reset();

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch {
      // Silently handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-orange-500 text-sm font-medium mb-4">
            聯絡我們
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            開始你的 AI 專案
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            有任何問題或需要客製化方案？我們隨時為你服務
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                與我們聯繫
              </h3>
              <p className="text-gray-400 leading-relaxed">
                無論你是剛開始探索 AI 物件偵測，還是需要企業級解決方案，
                我們的團隊都準備好協助你實現目標。
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl glass">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">電子郵件</div>
                  <div className="text-white">hello@yolotrainer.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl glass">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">地址</div>
                  <div className="text-white">台北市信義區信義路五段</div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
              <h4 className="font-display text-lg font-bold text-white mb-2">
                企業客戶
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                需要客製化方案或私有化部署？我們的企業團隊可以提供專屬支援。
              </p>
              <Button variant="outline" className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10">
                聯絡企業銷售
              </Button>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 lg:p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  姓名
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="你的名字"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  電子郵件
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-300">
                主旨
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="訊息主旨"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-300">
                訊息
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="請描述你的需求..."
                required
                rows={5}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`
                w-full py-6 rounded-full text-lg font-medium transition-all duration-300
                ${isSubmitted
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-orange-500 hover:bg-orange-600 hover:shadow-glow'}
              `}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  已送出
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  送出訊息
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
