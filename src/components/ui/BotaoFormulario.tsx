"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, ChevronRight } from "lucide-react";

export default function BotaoFormulario() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão depois que o usuário rolar 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.open("https://forms.gle/a6pP6f769RD3UukZ6", "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Tooltip expandido */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white/95 backdrop-blur-sm text-[#1a1a2e] text-sm font-medium px-4 py-2 rounded-xl shadow-lg border border-gray-200 flex items-center gap-2 whitespace-nowrap"
              >
                <span>Acesso do Professor</span>
                <ChevronRight size={14} className="text-[#1a8c3a]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão principal */}
          <motion.button
            onClick={handleClick}
            className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#1a8c3a] to-[#0d5c24] text-white shadow-lg shadow-[#1a8c3a]/30 hover:shadow-xl hover:shadow-[#1a8c3a]/50 transition-all duration-300 hover:scale-105 border-2 border-[#f5a623]/30"
            whileTap={{ scale: 0.9 }}
          >
            {/* Pulsação de fundo */}
            <span className="absolute inset-0 rounded-full bg-[#1a8c3a] animate-ping opacity-20"></span>
            
            {/* Ícone */}
            <FileText size={24} className="relative z-10" />
            
            {/* Badge "NOVO" */}
            <span className="absolute -top-1 -right-1 bg-[#f5a623] text-[#1a1a2e] text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-white/50">
              NOVO
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}