import GridMaterias from "@/components/materias/GridMaterias";
import materiasData from "@/data/materias.json";
import { CircuitBoard, Cpu, Zap } from "lucide-react";

export default function MateriasPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a14] overflow-hidden">
      {/* Fundo com efeito de circuito sutil */}
      <div className="absolute inset-0 bg-circuitos opacity-5"></div>
      
      {/* Círculos de luz no fundo */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Cabeçalho da página */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full text-blue-300 text-sm font-medium">
              <CircuitBoard size={14} />
              <span>Explorar Conteúdos</span>
              <Cpu size={14} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossas <span className="text-neon-cyan">Matérias</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Selecione uma matéria para acessar os materiais didáticos desenvolvidos pelos nossos professores.
          </p>
          
          {/* Indicador de quantidade */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span>{materiasData.materias.length} matérias disponíveis</span>
            </div>
            <div className="w-px h-4 bg-blue-500/10"></div>
            <div className="flex items-center gap-2 text-gray-500">
              <Zap size={12} className="text-yellow-400/50" />
              <span>Atualizado constantemente</span>
            </div>
          </div>
        </div>

        {/* Grid de matérias */}
        <GridMaterias materias={materiasData.materias} />
      </div>
    </div>
  );
}