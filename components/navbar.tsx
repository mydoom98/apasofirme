
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AuthButton } from '@/features/auth/components/auth-button';
import { Shield, Menu, X } from 'lucide-react';
import { useAuth } from '@/features/auth/store/auth.store';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-2 md:px-0">
      <div
        className={cn(
          "mx-auto mt-2 md:mt-4 flex items-center justify-between w-full md:w-[90%] md:max-w-7xl h-16 md:h-20 px-4 md:px-6 transition-all duration-300 ease-in-out border border-white/10 rounded-2xl md:rounded-3xl",
          isScrolled || isMenuOpen
            ? "bg-black/90 md:bg-black/80 backdrop-blur-xl shadow-lg text-white"
            : "bg-black/70 md:bg-black/40 backdrop-blur-lg shadow-md text-white"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
            <Image
              src="/pedro.jpeg"
              alt="PEDRO SMS Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <span className={cn("text-sm sm:text-base md:text-xl font-bold block text-white truncate")}>
              PINGUIS-SMS-FOLLOWERS
            </span>
            {!isScrolled && (
              <span className="text-[9px] sm:text-xs md:text-xs text-blue-200 hidden sm:block font-medium truncate">
                Explora Productos
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Links & Actions */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#productos"
            className="transition-colors text-base font-bold text-white hover:text-blue-400"
          >
            Catálogo
          </Link>

          {user && (
            <Link
              href="/admin"
              className="flex items-center gap-1 transition-colors text-base font-bold text-white hover:text-blue-400"
            >
              <Shield className="w-4 h-4" />
              Admin
            </Link>
          )}

          <AuthButton className="text-white" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-blue-400 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 left-0 bg-black z-40 md:hidden animate-in fade-in slide-in-from-top-2 duration-200 w-full overflow-x-hidden">
          <div className="flex flex-col items-center justify-start pt-8 h-[calc(100vh-4rem)] gap-4 px-4 overflow-y-auto w-full">
            <Link
              href="/#productos"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex justify-center py-4 rounded-2xl bg-white/5 border border-white/10 text-xl font-bold text-white hover:bg-white/10 hover:border-blue-500/50 transition-all tracking-tight"
            >
              Catálogo
            </Link>

            {user && (
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-xl font-bold text-white hover:bg-white/10 hover:border-blue-500/50 transition-all tracking-tight"
              >
                <Shield className="w-6 h-6 text-blue-400" />
                Panel Admin
              </Link>
            )}

            <div className="pt-6 w-full">
              <AuthButton className="text-white w-full scale-100 flex justify-center" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
