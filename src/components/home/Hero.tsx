"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f5f5] via-white to-[#e8f5e9] min-h-[calc(90vh-4rem)] flex items-center">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#1a8c3a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1a8c3a]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#1a8c3a]/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-[#e8f5e9] border border-[#1a8c3a]/20 rounded-full text-[#1a8c3a] text-sm font-medium mb-6">
              <Sparkles size={14} className="text-[#f5a623]" />
              <span>Educação com Tecnologia</span>
              <Zap size={12} className="text-[#1a8c3a]" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a1a2e] max-w-4xl"
          >
            Transformando a{" "}
            <span className="text-gradient-institutional">
              educação
            </span>
            {" "}com tecnologia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mt-6"
          >
            Acesse materiais didáticos produzidos pelos professores da rede municipal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Link href="/materias">
              <button className="px-8 py-4 rounded-2xl bg-[#1a8c3a] text-white font-semibold shadow-lg shadow-[#1a8c3a]/30 hover:shadow-xl hover:shadow-[#1a8c3a]/40 transition-all flex items-center gap-2 group hover:bg-[#0d5c24]">
                <BookOpen size={20} />
                Explorar Atividades
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="px-8 py-4 rounded-2xl border-2 border-[#1a8c3a] text-[#1a8c3a] font-semibold hover:bg-[#1a8c3a] hover:text-white transition-all">
              Ver Projetos
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-8 mt-12"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1a8c3a]">50+</p>
              <p className="text-sm text-gray-500">Materiais</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#f5a623]">15</p>
              <p className="text-sm text-gray-500">Matérias</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1a8c3a]">100%</p>
              <p className="text-sm text-gray-500">Gratuito</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
