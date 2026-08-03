"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, Bot, Zap, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// NÃO importamos o RoboMascote aqui

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
      {/* LINHA SUPERIOR LARANJA */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent"></div>
      
      {/* DETALHES DE CANTO LARANJA */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#f5a623]/20"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#f5a623]/20"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#f5a623]/30 blur-xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <GraduationCap size={28} className="text-white relative z-10 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <div className="relative">
              <span className="text-xl font-bold text-white tracking-tight">
                Edu<span className="text-[#f5a623]">Portal</span>
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-[#f5a623]/50 to-transparent"></span>
            </div>
            <div className="hidden md:flex items-center gap-1 ml-2">
              <span className="text-[8px] text-white/40 font-mono tracking-wider">SECRETARIA</span>
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
              <span className="relative z-10 text-sm font-medium text-white">Matérias</span>
              {isActive("/materias") && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#f5a623] rounded-full"></span>
              )}
            </Link>
            
            <Link 
              href="/sobre" 
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive("/sobre") 
                  ? "bg-white/10" 
                  : "hover:bg-white/10"
              }`}
            >
              <span className="relative z-10 text-sm font-medium text-white">Sobre</span>
              {isActive("/sobre") && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#f5a623] rounded-full"></span>
              )}
            </Link>

            {/* BOTÃO CONTATO */}
            <a 
              href="#" 
              className="ml-2 px-5 py-2.5 rounded-xl bg-[#4CAF50] text-white font-medium text-sm shadow-md shadow-[#4CAF50]/30 hover:shadow-lg hover:shadow-[#4CAF50]/50 transition-all flex items-center gap-2 hover:bg-[#43A047] border border-[#f5a623]/40"
            >
              <Bot size={16} />
              <span>Contato</span>
              <Zap size={12} className="text-white/50" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-white/20 hover:border-[#f5a623]/50 transition-colors group bg-white/10 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={20} className="text-white" />
            ) : (
              <Menu size={20} className="text-white" />
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
                className="absolute top-full left-0 w-full mt-2 bg-[#0d5c24] border border-[#1a8c3a] rounded-2xl shadow-xl overflow-hidden md:hidden"
              >
                <div className="flex flex-col p-4 gap-1">
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
                    href="/sobre" 
                    className={`flex items-center justify-between transition-colors py-3 px-4 rounded-xl ${
                      isActive("/sobre") 
                        ? "bg-white/10" 
                        : "hover:bg-white/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium text-white">Sobre</span>
                    <ChevronRight size={14} className={isActive("/sobre") ? "text-[#f5a623]" : "text-white/30"} />
                  </Link>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>
                  
                  <a 
                    href="#" 
                    className="w-full mt-1 bg-[#4CAF50] text-white font-medium rounded-xl py-3 flex items-center justify-center gap-2 shadow-md shadow-[#4CAF50]/20 hover:bg-[#43A047] transition-colors border border-[#f5a623]/30"
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
      
      {/* LINHA INFERIOR DO HEADER - ONDE O ROBÔ VAI SE CONECTAR */}
      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#f5a623]/20 to-transparent"></div>
    </header>
  );
}