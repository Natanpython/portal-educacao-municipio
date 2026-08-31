"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, School, Bot, Sparkles, GraduationCap } from "lucide-react";

const stats = [
  { 
    icon: School, 
    label: "Escolas", 
    value: "40", 
    color: "#1a8c3a",
    bg: "bg-[#e8f5e9]",
    border: "border-[#1a8c3a]/30",
    hover: "hover:bg-[#c8e6c9]"
  },
  { 
    icon: Users, 
    label: "Alunos", 
    value: "85", 
    color: "#f5a623",
    bg: "bg-[#fff3e0]",
    border: "border-[#f5a623]/30",
    hover: "hover:bg-[#ffe0b2]"
  },
  { 
    icon: BookOpen, 
    label: "Materiais", 
    value: "50+", 
    color: "#2196F3",
    bg: "bg-[#e3f2fd]",
    border: "border-[#2196F3]/30",
    hover: "hover:bg-[#bbdefb]"
  },
  { 
    icon: Bot, 
    label: "Projetos", 
    value: "20", 
    color: "#ff5299",
    bg: "bg-[#fce4ec]",
    border: "border-[#ff5299]/30",
    hover: "hover:bg-[#f8bbd0]"
  },
];

export default function SobreEducacao() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#1a8c3a] font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2">
            <GraduationCap size={16} />
            Nossa Educação
            <Sparkles size={14} className="text-[#f5a623]" />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mt-2">
            Compromisso com a <span className="text-[#1a8c3a]">educação</span> e tecnologia
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            A rede municipal de educação trabalha diariamente para oferecer ensino de qualidade, 
            integrando tecnologia e inovação nos materiais didáticos.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`text-center p-6 rounded-xl ${stat.bg} border ${stat.border} ${stat.hover} transition-all hover:shadow-lg hover:-translate-y-1 duration-300`}
            >
              <stat.icon className="w-10 h-10 mx-auto mb-3" style={{ color: stat.color }} />
              <p className="text-2xl font-bold text-[#1a1a2e]">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}