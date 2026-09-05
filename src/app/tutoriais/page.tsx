import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2, GraduationCap, Play, PlayCircle, Sparkles } from "lucide-react";
import GridCursos from "@/components/tutoriais/GridCursos";
import tutoriaisData from "@/data/tutoriais.json";

export const metadata: Metadata = {
  title: "Tutoriais | EduPortal",
  description: "Cursos e videoaulas da Secretaria Municipal de Educação.",
};

export default function TutoriaisPage() {
  const totalAulas = tutoriaisData.cursos.reduce((total, curso) => total + curso.aulas.length, 0);
  const aulasDisponiveis = tutoriaisData.cursos.reduce((total, curso) => total + curso.aulas.filter((aula) => aula.youtubeId).length, 0);
  const cursoDisponivel = tutoriaisData.cursos.find((curso) => curso.aulas.some((aula) => aula.youtubeId));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f9fa]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-[#1a8c3a]/5 blur-3xl" />
        <div className="absolute -left-24 top-[460px] h-96 w-96 rounded-full bg-[#f5a623]/5 blur-3xl" />
      </div>

      <section className="relative border-b border-[#1a8c3a]/10 bg-gradient-to-br from-white via-[#f8fbf8] to-[#e8f5e9]">
        <div className="container mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1a8c3a]/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1a8c3a] shadow-sm">
              <GraduationCap size={15} /> Central de Aprendizagem <Sparkles size={13} className="text-[#f5a623]" />
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-[#1a1a2e] md:text-5xl">
              Aprenda no seu ritmo e transforme <span className="text-gradient-institutional">ideias em projetos</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
              Trilhas preparadas para apoiar alunos, professores e toda a comunidade escolar com conhecimento prático e acessível.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="flex items-center gap-1.5 rounded-full border border-[#1a8c3a]/10 bg-white px-3 py-1.5 text-[#1a8c3a]"><CheckCircle2 size={13} /> Gratuito</span>
              <span className="flex items-center gap-1.5 rounded-full border border-[#2563eb]/10 bg-white px-3 py-1.5 text-[#2563eb]"><PlayCircle size={13} /> No seu ritmo</span>
              <span className="flex items-center gap-1.5 rounded-full border border-[#f5a623]/15 bg-white px-3 py-1.5 text-[#b8740d]"><BookOpenCheck size={13} /> Para toda a rede</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.7rem] border border-[#1a8c3a]/15 bg-white p-5 shadow-[0_20px_50px_rgba(13,92,36,0.1)] md:p-6">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1a8c3a] via-[#4ade80] to-[#f5a623]" />
            <span className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#e8f5e9]" />
            <div className="relative flex items-center justify-between">
              <div><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#1a8c3a]">Visão geral</p><p className="mt-1 text-sm font-bold text-[#1a1a2e]">Sua central de estudos</p></div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f5e9] text-[#1a8c3a]"><GraduationCap size={22} /></span>
            </div>

            <div className="relative mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-gray-50 p-3"><p className="text-xl font-bold text-[#1a1a2e]">{tutoriaisData.cursos.length}</p><p className="mt-0.5 text-[10px] text-gray-400">trilhas</p></div>
              <div className="rounded-xl bg-gray-50 p-3"><p className="text-xl font-bold text-[#1a1a2e]">{totalAulas}</p><p className="mt-0.5 text-[10px] text-gray-400">módulos</p></div>
              <div className="rounded-xl bg-[#fff8eb] p-3"><p className="text-xl font-bold text-[#e0961a]">{aulasDisponiveis}</p><p className="mt-0.5 text-[10px] text-gray-400">disponível</p></div>
            </div>

            {cursoDisponivel && (
              <div className="relative mt-4 rounded-2xl border border-[#1a8c3a]/10 bg-[#f7fbf8] p-4">
                <div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a8c3a] text-white"><Play size={16} fill="currentColor" /></span><div className="min-w-0"><p className="font-mono text-[8px] uppercase tracking-[0.18em] text-gray-400">Comece por aqui</p><p className="truncate text-sm font-bold text-[#1a1a2e]">{cursoDisponivel.titulo}</p></div></div>
                <Link href={`/tutoriais/${cursoDisponivel.slug}`} className="group mt-4 flex items-center justify-between rounded-xl bg-[#1a8c3a] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d5c24]">Começar agora <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
              </div>
            )}
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
