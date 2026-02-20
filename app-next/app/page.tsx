'use client'

import { GSAPProvider } from '@/components/providers/GSAPProvider'
import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { LogoCarousel } from '@/components/sections/LogoCarousel'
import { Features } from '@/components/sections/Features'
import { DownloadSection } from '@/components/sections/DownloadSection'
import { DemoGallery } from '@/components/sections/DemoGallery'
import { Pricing } from '@/components/sections/Pricing'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <GSAPProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation />

        <main>
          <Hero />
          <LogoCarousel />
          <Features />
          <DownloadSection />
          <DemoGallery />
          <Pricing />
          <Contact />
        </main>

        <Footer />
      </div>
    </GSAPProvider>
  )
}
