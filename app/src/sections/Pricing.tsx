import { useEffect, useRef, useState } from 'react';
import { Check, Lock, Cpu, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Free',
    icon: Cpu,
    price: '$0',
    period: '/月',
    description: '適合入門體驗',
    features: [
      { text: '基礎訓練功能', included: true },
      { text: 'YOLOv5 支援', included: true },
      { text: '最多 100 張圖片', included: true },
      { text: '社群支援', included: true },
      { text: 'YOLOv8 / YOLOv11', included: false },
      { text: '自動標註', included: false },
      { text: '資料增強', included: false },
      { text: '模型匯出', included: false },
    ],
    cta: '免費開始',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    icon: Zap,
    price: '$29',
    period: '/月',
    description: '適合專業開發者',
    features: [
      { text: '所有 Free 功能', included: true },
      { text: 'YOLOv5 / YOLOv8 / YOLOv11', included: true },
      { text: '無限圖片數量', included: true },
      { text: '自動標註功能', included: true },
      { text: '資料增強', included: true },
      { text: 'ONNX / TensorRT 匯出', included: true },
      { text: '優先技術支援', included: true },
      { text: 'API 存取', included: false },
    ],
    cta: '開始試用',
    highlighted: true,
    badge: '推薦',
  },
  {
    name: 'Enterprise',
    icon: Rocket,
    price: '$99',
    period: '/月',
    description: '適合企業團隊',
    features: [
      { text: '所有 Pro 功能', included: true },
      { text: 'CoreML / OpenVINO 匯出', included: true },
      { text: 'API 完整存取', included: true },
      { text: '協作功能', included: true },
      { text: '客製化訓練', included: true },
      { text: 'SLA 保障', included: true },
      { text: '專屬客戶經理', included: true },
      { text: '私有化部署選項', included: true },
    ],
    cta: '聯絡我們',
    highlighted: false,
    badge: null,
  },
];

export function Pricing() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [selectedPlan, setSelectedPlan] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.pricing-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
  }, []);

  const handlePlanClick = (planName: string) => {
    setSelectedPlan(planName);
    setAuthMode(planName === 'Free' ? 'register' : 'register');
    setIsAuthOpen(true);
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-orange-500 text-sm font-medium mb-4">
            訂閱方案
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            選擇適合你的方案
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            註冊帳號即可開始，升級解鎖更多進階功能
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative group ${plan.highlighted ? 'md:-translate-y-4' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-2xl blur opacity-30 animate-pulse" />
              )}

              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-xs font-bold rounded-full z-10">
                  {plan.badge}
                </div>
              )}

              <div className={`
                relative h-full rounded-2xl overflow-hidden
                ${plan.highlighted 
                  ? 'bg-gradient-to-b from-orange-500/10 to-transparent border-2 border-orange-500/50' 
                  : 'glass border border-white/5'}
              `}>
                <div className="p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${plan.highlighted ? 'bg-orange-500' : 'bg-white/10'}
                    `}>
                      <plan.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 text-xs">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="font-display text-4xl lg:text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                            ${plan.highlighted ? 'bg-orange-500' : 'bg-white/10'}
                          `}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Lock className="w-3 h-3 text-gray-600" />
                          </div>
                        )}
                        <span className={feature.included ? 'text-gray-300 text-sm' : 'text-gray-500 text-sm'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanClick(plan.name)}
                    className={`
                      w-full rounded-full py-6 transition-all duration-300
                      ${plan.highlighted 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-glow hover:shadow-glow-lg' 
                        : 'bg-white/10 hover:bg-white/20 text-white'}
                    `}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            所有付費方案均包含 14 天免費試用，隨時可以取消
          </p>
        </div>
      </div>

      {/* Auth Dialog */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {authMode === 'login' ? '登入帳號' : '註冊帳號'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedPlan === 'Free' 
                ? '註冊即可免費使用基礎功能' 
                : `註冊並開始 ${selectedPlan} 方案試用`}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">電子郵件</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">密碼</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            {authMode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">確認密碼</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-6"
            >
              {authMode === 'login' ? '登入' : '註冊'}
            </Button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-orange-500 hover:text-orange-400 text-sm"
            >
              {authMode === 'login' ? '還沒有帳號？立即註冊' : '已有帳號？立即登入'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
