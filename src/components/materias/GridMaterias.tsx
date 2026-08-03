"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, 
  Calculator, 
  Microscope, 
  ScrollText, 
  Globe, 
  Palette,
  ArrowRight,
  Bot,
  BookMarked,
  Sparkles
} from "lucide-react";
import { useState } from "react";

type Materia = {
  id: string;
  nome: string;
  slug: string;
  icone: string;
  cor: string;
  descricao: string;
  quantidade: number;
};

const iconMap: Record<string, any> = {
  BookOpen: BookOpen,
  Calculator: Calculator,
  Microscope: Microscope,
  ScrollText: ScrollText,
  Globe: Globe,
  Palette: Palette,
};

// Cada matéria com sua própria cor (mas o verde sempre presente)
const cores = {
  portugues: { 
    bg: "from-[#e8f5e9] to-[#c8e6c9]", 
    border: "border-[#1a8c3a]/30", 
    text: "text-[#1a8c3a]",
    hover: "hover:border-[#1a8c3a]",
    icon: "#1a8c3a",
    badge: "bg-[#1a8c3a]"
  },
  matematica: { 
    bg: "from-[#fff3e0] to-[#ffe0b2]", 
    border: "border-[#f5a623]/30", 
    text: "text-[#f5a623]",
    hover: "hover:border-[#f5a623]",
    icon: "#f5a623",
    badge: "bg-[#f5a623]"
  },
  ciencias: { 
    bg: "from-[#e3f2fd] to-[#bbdefb]", 
    border: "border-[#2196F3]/30", 
    text: "text-[#2196F3]",
    hover: "hover:border-[#2196F3]",
    icon: "#2196F3",
    badge: "bg-[#2196F3]"
  },
  historia: { 
    bg: "from-[#fce4ec] to-[#f8bbd0]", 
    border: "border-[#ff5299]/30", 
    text: "text-[#ff5299]",
    hover: "hover:border-[#ff5299]",
    icon: "#ff5299",
    badge: "bg-[#ff5299]"
  },
  geografia: { 
    bg: "from-[#f3e5f5] to-[#e1bee7]", 
    border: "border-[#af40ff]/30", 
    text: "text-[#af40ff]",
    hover: "hover:border-[#af40ff]",
    icon: "#af40ff",
    badge: "bg-[#af40ff]"
  },
  artes: { 
    bg: "from-[#fce4ec] to-[#f8bbd0]", 
    border: "border-[#ff5299]/30", 
    text: "text-[#ff5299]",
    hover: "hover:border-[#ff5299]",
    icon: "#ff5299",
    badge: "bg-[#ff5299]"
  },
};

export default function GridMaterias({ materias }: { materias: Materia[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon size={28} /> : <BookOpen size={28} />;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {materias.map((materia, index) => {
        const cor = cores[materia.id as keyof typeof cores] || cores.portugues;
        const isHovered = hoveredId === materia.id;

        return (
          <motion.div
            key={materia.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredId(materia.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link href={`/conteudos?materia=${materia.slug}`}>
              <motion.div
                className={`group relative bg-white rounded-2xl overflow-hidden border ${cor.border} shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer`}
                whileHover={{ 
                  y: -6,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Linha superior com gradiente colorido */}
                <div 
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ background: `linear-gradient(90deg, ${cor.icon}, ${cor.icon}dd, transparent)` }}
                />

                {/* Badge colorida no canto */}
                <div className={`absolute top-4 right-4 ${cor.badge} text-white text-[10px] font-mono px-2 py-1 rounded-full flex items-center gap-1 shadow-sm`}>
                  <Sparkles size={10} />
                  {materia.quantidade}
                </div>

                {/* Conteúdo do card */}
                <div className="p-6 pt-8 relative">
                  {/* Ícone */}
                  <div 
                    className={`p-3 rounded-xl transition-all duration-300 inline-block ${
                      isHovered ? 'shadow-lg' : ''
                    }`}
                    style={{ 
                      backgroundColor: `${cor.icon}15`,
                    }}
                  >
                    <motion.div
                      style={{ color: cor.icon }}
                      animate={isHovered ? { 
                        rotate: [0, 8, -8, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {getIcon(materia.icone)}
                    </motion.div>
                  </div>

                  {/* Título e descrição */}
                  <h3 className={`text-xl font-bold text-[#1a1a2e] transition-colors mt-3 ${
                    isHovered ? cor.text : ''
                  }`}>
                    {materia.nome}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {materia.descricao}
                  </p>

                  {/* Footer */}
                  <motion.div 
                    className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100"
                    animate={isHovered ? { x: 3 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      isHovered ? cor.text : 'text-gray-400'
                    }`}>
                      <Bot size={14} />
                      Explorar
                    </span>
                    <motion.div
                      animate={isHovered ? { x: 5, scale: 1.1 } : { x: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                        isHovered 
                          ? `border-${cor.icon}/30 bg-${cor.icon}/10` 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <ArrowRight size={14} className={`transition-colors ${
                        isHovered ? cor.text : 'text-gray-400'
                      }`} />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}