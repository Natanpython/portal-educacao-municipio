"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export default function RoboMascote() {
  const [mensagem, setMensagem] = useState("Olá!");
  const [brilho, setBrilho] = useState(1);
  
  const mensagens = [
    "Olá! 💚",
    "Explore as matérias! 📚",
    "Tecnologia é futuro! 🚀",
    "Vamos aprender! 🎓",
    "Robótica é incrível! 🤖",
    "Inovação sempre! ✨"
  ];

  useEffect(() => {
    const mensagemInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mensagens.length);
      setMensagem(mensagens[randomIndex]);
    }, 5000);

    const brilhoInterval = setInterval(() => {
      setBrilho(0.6 + Math.random() * 0.4);
    }, 2000);

    return () => {
      clearInterval(mensagemInterval);
      clearInterval(brilhoInterval);
    };
  }, []);

  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-50 cursor-pointer select-none"
      whileHover={{ scale: 1.08 }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div 
        className="relative bg-white p-4 rounded-2xl shadow-xl transition-all duration-300"
        style={{
          boxShadow: `0 0 30px rgba(26, 140, 58, ${brilho * 0.15}), 0 8px 30px rgba(0,0,0,0.1)`,
          border: `2px solid rgba(26, 140, 58, ${brilho * 0.5})`
        }}
      >
        {/* Efeito de brilho suave */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 20%, rgba(26, 140, 58, ${brilho * 0.06}), transparent 70%)`,
          }}
        />
        
        {/* Antena com bolinha verde */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="w-0.5 h-5 bg-[#1a8c3a] mx-auto"></div>
          <motion.div 
            className="w-3 h-3 bg-[#1a8c3a] rounded-full mx-auto flex items-center justify-center"
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 10px rgba(26, 140, 58, 0.3)",
                "0 0 25px rgba(26, 140, 58, 0.6)",
                "0 0 10px rgba(26, 140, 58, 0.3)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles size={6} className="text-white" />
          </motion.div>
        </div>
        
        {/* Corpo do robô */}
        <div className="text-center relative">
          {/* Ícone do robô com fundo verde claro */}
          <div className="w-14 h-14 rounded-full bg-[#e8f5e9] mx-auto flex items-center justify-center border-2 border-[#1a8c3a]">
            <Bot size={28} className="text-[#1a8c3a]" />
          </div>
          
          {/* Olhos LED */}
          <div className="flex gap-3 justify-center mt-2">
            <motion.div 
              className="w-2.5 h-2.5 rounded-full bg-[#1a8c3a]"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="w-2.5 h-2.5 rounded-full bg-[#f5a623]"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          {/* Mensagem */}
          <motion.div 
            className="text-xs text-[#1a1a2e]/70 mt-2 font-mono whitespace-nowrap bg-[#e8f5e9] px-2.5 py-1 rounded-full border border-[#1a8c3a]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            &lt;{mensagem} /&gt;
          </motion.div>
        </div>
        
        {/* Conexões decorativas */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-[#1a8c3a]/40 to-transparent"></div>
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#1a8c3a]/15 rounded-tl"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#1a8c3a]/15 rounded-br"></div>
        
        {/* LEDs decorativos pequenos */}
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#f5a623]/50 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[#1a8c3a]/50 rounded-full animate-pulse delay-75"></div>
      </div>
    </motion.div>
  );
}