import GridMaterias from "@/components/materias/GridMaterias";
import materiasData from "@/data/materias.json";
import conteudosData from "@/data/conteudos.json";
import { BookOpen, Sparkles, Zap } from "lucide-react";

export default function MateriasPage() {
  return (
    <div className="relative min-h-screen bg-[#f8f9fa] overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#1a8c3a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#f5a623]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Cabeçalho da página */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#e8f5e9] border border-[#1a8c3a]/20 rounded-full text-[#1a8c3a] text-sm font-medium">
              <BookOpen size={14} />
              <span>Explorar Conteúdos</span>
              <Sparkles size={14} className="text-[#f5a623]" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
            Biblioteca Digital do <span className="text-gradient-institutional">Conhecimento</span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Encontre matérias e materiais didáticos desenvolvidos para apoiar professores e estudantes da rede municipal.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 bg-[#1a8c3a] rounded-full"></span>
              <span>{materiasData.materias.length} matérias disponíveis</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-500">
              <Zap size={12} className="text-[#f5a623]" />
              <span>Atualizado constantemente</span>
            </div>
          </div>
        </div>

        {/* Grid de matérias */}
        <GridMaterias materias={materiasData.materias} conteudos={conteudosData.conteudos} />
      </div>
    </div>
  );
}
