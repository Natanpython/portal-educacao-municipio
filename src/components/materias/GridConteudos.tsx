"use client";

import { motion } from "framer-motion";
import { Download, FileText, Calendar, Tag, Bot, Sparkles, BookOpen } from "lucide-react";
import { useState } from "react";

type Conteudo = {
  id: string;
  materiaSlug: string;
  titulo: string;
  descricao: string;
  arquivo: string;
  data: string;
  tags: string[];
};

// Cores alternadas para os cards de conteúdo
const coresCards = [
  { bg: "from-[#e8f5e9] to-[#c8e6c9]", border: "hover:border-[#1a8c3a]/30", icon: "text-[#1a8c3a]", btn: "bg-[#1a8c3a] hover:bg-[#0d5c24]" },
  { bg: "from-[#fff3e0] to-[#ffe0b2]", border: "hover:border-[#f5a623]/30", icon: "text-[#f5a623]", btn: "bg-[#f5a623] hover:bg-[#e0961a]" },
  { bg: "from-[#fce4ec] to-[#f8bbd0]", border: "hover:border-[#ff5299]/30", icon: "text-[#ff5299]", btn: "bg-[#ff5299] hover:bg-[#e6488a]" },
  { bg: "from-[#f3e5f5] to-[#e1bee7]", border: "hover:border-[#af40ff]/30", icon: "text-[#af40ff]", btn: "bg-[#af40ff] hover:bg-[#9a35e6]" },
  { bg: "from-[#e3f2fd] to-[#bbdefb]", border: "hover:border-[#2196F3]/30", icon: "text-[#2196F3]", btn: "bg-[#2196F3] hover:bg-[#1976D2]" },
];

export default function GridConteudos({ 
  conteudos, 
  materiaSlug 
}: { 
  conteudos: Conteudo[]; 
  materiaSlug: string;
}) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (id: string, arquivo: string) => {
    setDownloading(id);
    setTimeout(() => {
      window.open(`/files/${materiaSlug}/${arquivo}`, '_blank');
      setDownloading(null);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {conteudos.map((conteudo, index) => {
        const cor = coresCards[index % coresCards.length];

        return (
          <motion.div
            key={conteudo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className={`group bg-gradient-to-br ${cor.bg} bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 ${cor.border}`}
          >
            <div className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2.5 bg-white/50 rounded-xl group-hover:bg-white/80 transition-colors`}>
                  <BookOpen size={18} className={cor.icon} />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(conteudo.data).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <h3 className={`text-lg font-bold text-[#1a1a2e] group-hover:${cor.icon} transition-colors line-clamp-2`}>
                {conteudo.titulo}
              </h3>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                {conteudo.descricao}
              </p>

              {conteudo.tags && conteudo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {conteudo.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs bg-white/70 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                  {conteudo.tags.length > 3 && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{conteudo.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              <button
                className={`w-full mt-4 ${cor.btn} text-white font-medium rounded-xl py-2.5 px-4 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group/btn`}
                onClick={() => handleDownload(conteudo.id, conteudo.arquivo)}
                disabled={downloading === conteudo.id}
              >
                {downloading === conteudo.id ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Baixando...
                  </>
                ) : (
                  <>
                    <Download size={16} className="group-hover/btn:animate-bounce" />
                    Baixar Material
                    <Sparkles size={12} className="text-white/50" />
                  </>
                )}
              </button>
            </div>

            <div className={`h-0.5 bg-gradient-to-r from-[${cor.icon}]/30 to-transparent group-hover:from-[${cor.icon}]/60 transition-all duration-500`}></div>
          </motion.div>
        );
      })}
    </div>
  );
}