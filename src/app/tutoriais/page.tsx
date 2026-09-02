import type { Metadata } from "next";
import { BookOpenCheck, GraduationCap, PlayCircle, Sparkles } from "lucide-react";
import GridCursos from "@/components/tutoriais/GridCursos";
import tutoriaisData from "@/data/tutoriais.json";

export const metadata: Metadata = {
  title: "Tutoriais | EduPortal",
  description: "Cursos e videoaulas da Secretaria Municipal de Educação.",
};

export default function TutoriaisPage() {
  const totalAulas = tutoriaisData.cursos.reduce((total, curso) => total + curso.aulas.length, 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f9fa]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-[#1a8c3a]/5 blur-3xl" />
        <div className="absolute -left-24 top-[460px] h-96 w-96 rounded-full bg-[#f5a623]/5 blur-3xl" />
      </div>

      <section className="relative border-b border-[#1a8c3a]/10 bg-gradient-to-br from-white via-[#f8fbf8] to-[#e8f5e9]">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1a8c3a]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#1a8c3a] shadow-sm">
              <GraduationCap size={16} />
              Aprenda no seu ritmo
              <Sparkles size={14} className="text-[#f5a623]" />
            </div>
            <h1 className="mt-6 text-4xl font-bold text-[#1a1a2e] md:text-5xl">
              Tutoriais e <span className="text-gradient-institutional">videoaulas</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              Aulas preparadas e selecionadas pela Secretaria de Educação para apoiar alunos, professores e toda a comunidade escolar.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                <BookOpenCheck size={16} className="text-[#1a8c3a]" />
                {tutoriaisData.cursos.length} cursos
              </span>
              <span className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                <PlayCircle size={16} className="text-[#f5a623]" />
                {totalAulas} aulas
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 py-14 md:py-20">
        <div className="mb-9">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#1a8c3a]">Cursos disponíveis</span>
          <h2 className="mt-1 text-2xl font-bold text-[#1a1a2e] md:text-3xl">Escolha o que deseja aprender</h2>
          <p className="mt-2 text-gray-500">Selecione um curso para acessar todas as aulas disponíveis.</p>
        </div>
        <GridCursos cursos={tutoriaisData.cursos} />
      </section>
    </div>
  );
}
