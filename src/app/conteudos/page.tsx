import GridConteudos from "@/components/materias/GridConteudos";
import materiasData from "@/data/materias.json";
import conteudosData from "@/data/conteudos.json";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, Download } from "lucide-react";

const iconMap: Record<string, string> = {
  portugues: "📚",
  matematica: "📐",
  ciencias: "🔬",
  historia: "📜",
  geografia: "🌍",
  artes: "🎨",
};

export default async function ConteudosPage({
  searchParams,
}: {
  searchParams: Promise<{ materia: string }>;
}) {
  const params = await searchParams;
  const materiaSlug = params.materia || "";
  
  const materia = materiasData.materias.find(m => m.slug === materiaSlug);
  const conteudos = conteudosData.conteudos.filter(
    c => c.materiaSlug === materiaSlug
  );

  if (!materia) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1a1a2e]">Matéria não encontrada</h1>
          <Link href="/materias" className="text-[#1a8c3a] hover:text-[#0d5c24] mt-4 inline-block font-medium">
            Voltar para matérias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f5f5f5] overflow-hidden pt-24">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: materia.cor }}
        ></div>
        <div 
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ backgroundColor: materia.cor }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link 
          href="/materias" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1a8c3a] transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para matérias</span>
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border"
              style={{ 
                backgroundColor: `${materia.cor}15`,
                borderColor: `${materia.cor}30`
              }}
            >
              {iconMap[materia.id] || "📚"}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
                  {materia.nome}
                </h1>
                <span 
                  className="text-xs font-mono px-3 py-1 rounded-full border"
                  style={{ 
                    color: materia.cor,
                    borderColor: `${materia.cor}30`,
                    backgroundColor: `${materia.cor}10`
                  }}
                >
                  {conteudos.length} materiais
                </span>
              </div>
              <p className="text-gray-500 mt-1">{materia.descricao}</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono border border-gray-200 px-3 py-1.5 rounded-full bg-[#e8f5e9]">
              <Download size={12} className="text-[#1a8c3a]" />
              <span className="text-[#1a8c3a]">download disponível</span>
            </div>
          </div>
        </div>

        {conteudos.length > 0 ? (
          <GridConteudos conteudos={conteudos} materiaSlug={materiaSlug} />
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4 opacity-30">📭</div>
            <p className="text-gray-500 text-lg">
              Nenhum material disponível para esta matéria ainda.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Novos conteúdos serão adicionados em breve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}