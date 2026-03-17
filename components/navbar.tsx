'use client';

import Link from 'next/link';
import { AuthButton } from '@/features/auth/components/auth-button';
import { Shield, Menu, X } from 'lucide-react';
import { useAuth } from '@/features/auth/store/auth.store';
import { useState } from 'react';

export function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="landing-header">
          <img src="/img/logo.png" className="logo-header" alt="A Paso Firme Logo" />
          <div className="header-text">
              <h1>A PASO FIRME</h1>
              <p>Catálogo mayorista de zapatillas</p>
          </div>
      </header>

      <nav className="relative flex items-center justify-center min-h-[50px] flex-wrap">
          <div className="hidden md:flex items-center justify-center flex-wrap w-full max-w-[800px]">
              <Link href="/">Inicio</Link>
              <Link href="/#productos">Zapatillas</Link>
              <Link href="/comprar">Cómo comprar</Link>
              <Link href="/envios">Envíos</Link>

              {user && (
                <Link href="/admin" className="min-w-fit inline-flex items-center gap-1 text-blue-400 ml-4">
                  <Shield className="w-4 h-4 inline" /> Admin
                </Link>
              )}
          </div>
          
          <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2">
               <AuthButton className="text-white hover:text-gray-300 transition-colors" />
          </div>

          <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-gray-300">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-[100%] left-0 w-full bg-[#111] border-t border-gray-800 flex flex-col items-center py-4 z-50 md:hidden gap-2 shadow-xl">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
              <Link href="/#productos" onClick={() => setIsMenuOpen(false)}>Zapatillas</Link>
              <Link href="/comprar" onClick={() => setIsMenuOpen(false)}>Cómo comprar</Link>
              <Link href="/envios" onClick={() => setIsMenuOpen(false)}>Envíos</Link>
              {user && (
                <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-1 text-blue-400">
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
              <div className="pt-2">
                <AuthButton />
              </div>
            </div>
          )}
      </nav>
    </>
  );
}
