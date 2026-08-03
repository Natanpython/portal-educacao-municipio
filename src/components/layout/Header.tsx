"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, Bot, Zap, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // ← PEGA A PÁGINA ATUAL

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verifica se o link está ativo
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100" 
        : "bg-white/70 backdrop-blur-sm border-b border-gray-100/50"
    }`}>
      {/* Linha superior verde */}
      <div className={`absolute top-0 left-0 w-full h-0.5 transition-opacity duration-500 ${
        scrolled ? "bg-gradient-to-r from-transparent via-[#1a8c3a] to-transparent opacity-100" : "bg-gradient-to-r from-transparent via-[#1a8c3a] to-transparent opacity-60"
      }`}></div>
      
      {/* Detalhes de canto */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#1a8c3a]/10"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#1a8c3a]/10"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#1a8c3a]/20 blur-xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <GraduationCap size={28} className="text-[#1a8c3a] relative z-10 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <div className="relative">
              <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">
                Edu<span className="text-[#1a8c3a]">Portal</span>
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-[#1a8c3a]/30 to-transparent"></span>
            </div>
            <div className="hidden md:flex items-center gap-1 ml-2">
              <span className="text-[8px] text-gray-400 font-mono tracking-wider">SECRETARIA</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                isActive("/") 
                  ? "text-[#1a8c3a] bg-[#1a8c3a]/10 font-medium" 
                  : "text-gray-600 hover:text-[#1a8c3a] hover:bg-[#1a8c3a]/10"
              }`}
            >
              <span className="relative z-10 text-sm font-medium">Início</span>
              {isActive("/") && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#1a8c3a] rounded-full"></span>
              )}
            </Link>
            
            <Link 
              href="/materias" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                isActive("/materias") 
                  ? "text-[#1a8c3a] bg-[#1a8c3a]/10 font-medium" 
                  : "text-gray-600 hover:text-[#1a8c3a] hover:bg-[#1a8c3a]/10"
              }`}
            >
              <span className="relative z-10 text-sm font-medium">Matérias</span>
              {isActive("/materias") && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#1a8c3a] rounded-full"></span>
              )}
            </Link>
            
            <Link 
              href="/sobre" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                isActive("/sobre") 
                  ? "text-[#1a8c3a] bg-[#1a8c3a]/10 font-medium" 
                  : "text-gray-600 hover:text-[#1a8c3a] hover:bg-[#1a8c3a]/10"
              }`}
            >
              <span className="relative z-10 text-sm font-medium">Sobre</span>
              {isActive("/sobre") && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#1a8c3a] rounded-full"></span>
              )}
            </Link>

            <a 
              href="#" 
              className="ml-2 px-5 py-2.5 rounded-xl bg-[#1a8c3a] text-white font-medium text-sm shadow-md shadow-[#1a8c3a]/25 hover:shadow-lg hover:shadow-[#1a8c3a]/40 transition-all flex items-center gap-2 hover:bg-[#0d5c24]"
            >
              <Bot size={16} />
              <span>Contato</span>
              <Zap size={12} className="text-white/50" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200/70 hover:border-[#1a8c3a]/50 transition-colors group bg-white/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={20} className="text-[#1a1a2e]" />
            ) : (
              <Menu size={20} className="text-[#1a1a2e]" />
            )}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100/50 shadow-xl overflow-hidden md:hidden"
              >
                <div className="flex flex-col p-4 gap-1">
                  <Link 
                    href="/" 
                    className={`flex items-center justify-between transition-colors py-3 px-4 rounded-xl ${
                      isActive("/") 
                        ? "text-[#1a8c3a] bg-[#1a8c3a]/10 font-medium" 
                        : "text-gray-600 hover:text-[#1a8c3a] hover:bg-[#1a8c3a]/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">Início</span>
                    <ChevronRight size={14} className={isActive("/") ? "text-[#1a8c3a]" : "text-gray-300"} />
                  </Link>
                  
                  <Link 
                    href="/materias" 
                    className={`flex items-center justify-between transition-colors py-3 px-4 rounded-xl ${
                      isActive("/materias") 
                        ? "text-[#1a8c3a] bg-[#1a8c3a]/10 font-medium" 
                        : "text-gray-600 hover:text-[#1a8c3a] hover:bg-[#1a8c3a]/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">Matérias</span>
                    <ChevronRight size={14} className={isActive("/materias") ? "text-[#1a8c3a]" : "text-gray-300"} />
                  </Link>
                  
                  <Link 
                    href="/sobre" 
                    className={`flex items-center justify-between transition-colors py-3 px-4 rounded-xl ${
                      isActive("/sobre") 
                        ? "text-[#1a8c3a] bg-[#1a8c3a]/10 font-medium" 
                        : "text-gray-600 hover:text-[#1a8c3a] hover:bg-[#1a8c3a]/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">Sobre</span>
                    <ChevronRight size={14} className={isActive("/sobre") ? "text-[#1a8c3a]" : "text-gray-300"} />
                  </Link>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent my-2"></div>
                  
                  <a 
                    href="#" 
                    className="w-full mt-1 bg-[#1a8c3a] text-white font-medium rounded-xl py-3 flex items-center justify-center gap-2 shadow-md shadow-[#1a8c3a]/20 hover:bg-[#0d5c24] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Bot size={16} />
                    <span>Contato</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}