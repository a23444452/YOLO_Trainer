'use client'

import { useEffect, useRef, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Download, LogOut } from 'lucide-react';
import { gsap } from '@/lib/gsap'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
    if (linksRef.current) {
      gsap.fromTo(
        linksRef.current.children,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.6 }
      );
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: '功能', id: 'features' },
    { label: '下載', id: 'download' },
    { label: '示範', id: 'demo' },
    { label: '定價', id: 'pricing' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled
          ? 'w-[95%] max-w-6xl glass-dark rounded-2xl shadow-lg'
          : 'w-[95%] max-w-6xl bg-transparent'
      }`}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <Image src="/logo.svg" alt="YOLO Trainer" width={32} height={32} className="w-8 h-8" />
          <span className="font-display font-bold text-lg tracking-wide text-white">
            YOLO TRAINER
          </span>
        </div>

        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={() => scrollToSection('download')}
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            下載
          </Button>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link href="/dashboard">
                  <User className="w-4 h-4 mr-2" />
                  我的帳號
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10"
                onClick={() => signOut()}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-glow"
              asChild
            >
              <Link href="/login">
                註冊 / 登入
              </Link>
            </Button>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden glass-dark rounded-b-2xl border-t border-white/5">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-gray-400 hover:text-orange-500 transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('download')}
              className="bg-orange-500 hover:bg-orange-600 text-white w-full rounded-full mt-2"
            >
              <Download className="w-4 h-4 mr-2" />
              免費下載
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
