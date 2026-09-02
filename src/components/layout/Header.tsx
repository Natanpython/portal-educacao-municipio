"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Bot, Zap, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? "bg-[#0d5c24] shadow-lg border-b border-[#1a8c3a]" 
        : "bg-[#0d5c24] border-b border-[#1a8c3a]/30"
    }`}>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#f5a623]/20"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#f5a623]/20"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Assinatura institucional */}
          <Link
            href="/"
            aria-label="Ir para a página inicial"
            onClick={() => setIsMenuOpen(false)}
            className="group relative flex h-14 w-[180px] items-center justify-center transition-all duration-300 hover:-translate-y-0.5 md:h-16 md:w-[200px] lg:w-[230px]"
          >
            <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/images/logo-header.png"
                alt="Prefeitura de Bayeux"
                fill
                sizes="(max-width: 768px) 180px, 230px"
                className="object-contain drop-shadow-[0_3px_5px_rgba(0,0,0,0.28)]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive("/") 
                  ? "bg-white/10" 
                  : "hover:bg-white/10"
              }`}
            >
              <span className="relative z-10 text-sm font-medium text-white">Início</span>
              {isActive("/") && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#f5a623] rounded-full"></span>
              )}
            </Link>
            
            <Link 
              href="/materias" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive("/materias") 
                  ? "bg-white/10" 
                  : "hover:bg-white/10"
              }`}
            >
              <span className="relative z-10 text-sm font-medium text-white">Atividades</span>
              {isActive("/materias") && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#f5a623] rounded-full"></span>
              )}
            </Link>
            
            <Link 
              href="/tutoriais" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive("/tutoriais") 
                  ? "bg-white/10" 
                  : "hover:bg-white/10"
              }`}
            >
              <span className="relative z-10 text-sm font-medium text-white">Tutoriais</span>
              {isActive("/tutoriais") && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#f5a623] rounded-full"></span>
              )}
            </Link>

            <Link 
              href="/contato" 
              className={`ml-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm shadow-md transition-all flex items-center gap-2 border border-[#f5a623]/40 ${
                isActive("/contato")
                  ? "bg-[#43A047] shadow-lg shadow-[#4CAF50]/50"
                  : "bg-[#4CAF50] shadow-[#4CAF50]/30 hover:bg-[#43A047] hover:shadow-lg hover:shadow-[#4CAF50]/50"
              }`}
            >
              <Bot size={16} />
              <span>Contato</span>
              <Zap size={12} className="text-white/50" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden relative w-12 h-11 flex items-center justify-center rounded-xl border transition-all duration-300 group backdrop-blur-sm ${
              isMenuOpen
                ? "border-[#f5a623]/70 bg-[#f5a623]/10 shadow-[0_0_18px_rgba(245,166,35,0.16)]"
                : "border-white/20 bg-white/10 hover:border-[#f5a623]/50"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            <motion.span
              className="relative block h-7 w-8 rounded-[9px] border border-[#f5a623]/80 bg-[#0a481d] shadow-[inset_0_0_8px_rgba(245,166,35,0.12)]"
              animate={isMenuOpen ? { rotate: [0, -5, 5, 0], scale: 1.04 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <span className="absolute -top-2 left-1/2 h-2 w-px -translate-x-1/2 bg-[#f5a623]" />
              <motion.span
                className="absolute -top-2.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#f5a623] shadow-[0_0_5px_#f5a623]"
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <motion.span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_4px_#4ade80]" animate={{ scaleY: isMenuOpen ? 0.25 : 1 }} />
              <motion.span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_4px_#4ade80]" animate={{ scaleY: isMenuOpen ? 0.25 : 1 }} />

              <span className="absolute bottom-1.5 left-1/2 h-2.5 w-3.5 -translate-x-1/2">
                <motion.i className="absolute left-0 top-0 block h-px w-3.5 rounded-full bg-[#f5a623]" animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
                <motion.i className="absolute left-0 top-1 block h-px w-3.5 rounded-full bg-[#f5a623]" animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} />
                <motion.i className="absolute left-0 top-2 block h-px w-3.5 rounded-full bg-[#f5a623]" animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
              </span>
            </motion.span>
            <span className="sr-only">{isMenuOpen ? "Fechar" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full origin-top overflow-hidden rounded-b-2xl border-x border-b border-[#1a8c3a] bg-[#0d5c24]/98 shadow-2xl shadow-black/25 backdrop-blur-xl md:hidden"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#f5a623]/70 to-transparent" />
            <div className="flex flex-col p-4 pt-3 gap-1">
              <div className="mb-2 flex items-center gap-2 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                <Bot size={12} className="text-[#f5a623]/70" />
                Menu de navegação
              </div>
              <Link 
                href="/" 
                className={`flex items-center justify-between transition-colors py-3 px-4 rounded-xl ${
                  isActive("/") 
                    ? "bg-white/10" 
                    : "hover:bg-white/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-medium text-white">Início</span>
                <ChevronRight size={14} className={isActive("/") ? "text-[#f5a623]" : "text-white/30"} />
              </Link>
              
              <Link 
                href="/materias" 
                className={`flex items-center justify-between transition-colors py-3 px-4 rounded-xl ${
                  isActive("/materias") 
                    ? "bg-white/10" 
                    : "hover:bg-white/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-medium text-white">Matérias</span>
                <ChevronRight size={14} className={isActive("/materias") ? "text-[#f5a623]" : "text-white/30"} />
              </Link>
              
              <Link 
                href="/tutoriais" 
                className={`flex items-center justify-between transition-colors py-3 px-4 rounded-xl ${
                  isActive("/tutoriais") 
                    ? "bg-white/10" 
                    : "hover:bg-white/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-medium text-white">Tutoriais</span>
                <ChevronRight size={14} className={isActive("/tutoriais") ? "text-[#f5a623]" : "text-white/30"} />
              </Link>
              
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>
              
              <Link 
                href="/contato" 
                className="w-full mt-1 bg-[#4CAF50] text-white font-medium rounded-xl py-3 flex items-center justify-center gap-2 shadow-md shadow-[#4CAF50]/20 hover:bg-[#43A047] transition-colors border border-[#f5a623]/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bot size={16} />
                <span>Contato</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
