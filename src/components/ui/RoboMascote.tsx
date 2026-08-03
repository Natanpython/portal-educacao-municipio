"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export default function RoboMascote() {
  const [mensagem, setMensagem] = useState("Olá!");
  const [brilho, setBrilho] = useState(1);
  
  const mensagens = [
    "Olá! ",
    "Explore as matérias! ",
    "Tecnologia é futuro! ",
    "Vamos aprender! ",
    "Robótica é incrível! ",
    "Inovação sempre! "
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
      className="hidden md:block fixed z-50 cursor-pointer select-none"
      style={{
        top: '99px',
        right: '24px',
      }}
      whileHover={{ scale: 1.08 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* LINHA DE CONEXÃO COM O HEADER */}
      <div className="absolute -top-4 right-1/2 w-0.5 h-4 bg-gradient-to-b from-[#f5a623]/40 to-[#f5a623]/10 pointer-events-none"></div>
      <div className="absolute -top-4 right-1/2 w-6 h-6 border-t-2 border-r-2 border-[#f5a623]/20 rounded-tr-2xl pointer-events-none -translate-x-1/2"></div>

      <div 
        className="relative bg-[#0d5c24]/90 backdrop-blur-md p-3 rounded-2xl shadow-xl transition-all duration-300 border-2"
        style={{
          borderColor: `rgba(245, 166, 35, ${brilho * 0.7})`,
          boxShadow: `0 0 30px rgba(13, 92, 36, ${brilho * 0.3}), 0 8px 30px rgba(0,0,0,0.15)`
        }}
      >
        {/* Efeito de brilho */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 20%, rgba(245, 166, 35, ${brilho * 0.1}), transparent 70%)`,
          }}
        />
        
        {/* Antena com bolinha laranja */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="w-0.5 h-5 bg-[#f5a623] mx-auto"></div>
          <motion.div 
            className="w-3 h-3 bg-[#f5a623] rounded-full mx-auto flex items-center justify-center"
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 10px rgba(245, 166, 35, 0.4)",
                "0 0 25px rgba(245, 166, 35, 0.7)",
                "0 0 10px rgba(245, 166, 35, 0.4)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles size={6} className="text-white" />
          </motion.div>
        </div>
        
        {/* Corpo do robô */}
        <div className="text-center relative">
          <div className="w-12 h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center border-2 border-[#f5a623] backdrop-blur-sm">
            <Bot size={24} className="text-[#f5a623]" />
          </div>
          
          <div className="flex gap-2 justify-center mt-1.5">
            <motion.div 
              className="w-2 h-2 rounded-full bg-[#f5a623]"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full bg-[#4CAF50]"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <motion.div 
            className="text-[10px] text-white/80 mt-1.5 font-mono whitespace-nowrap bg-white/10 px-2 py-0.5 rounded-full border border-[#f5a623]/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            &lt;{mensagem} /&gt;
          </motion.div>
        </div>
        
        {/* Conexões decorativas */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623]/40 to-transparent"></div>
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#f5a623]/20 rounded-tl"></div>
        <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#f5a623]/20 rounded-br"></div>
        
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#f5a623]/50 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#4CAF50]/50 rounded-full animate-pulse delay-75"></div>
      </div>
    </motion.div>
  );
}