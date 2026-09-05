"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, Clock3, Code2, GraduationCap, Play, PlayCircle, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Curso = {
  id: string; slug: string; titulo: string; descricao: string; categoria: string; nivel: string;
  cor: string; icone: string; destaque: boolean; aulas: Array<{ id: string; youtubeId: string }>;
};

const icones: Record<string, LucideIcon> = { Bot, Code2, GraduationCap };

export default function GridCursos({ cursos }: { cursos: Curso[] }) {
  const reduzirMovimento = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cursos.map((curso, index) => {
        const Icone = icones[curso.icone] ?? GraduationCap;
        const disponiveis = curso.aulas.filter((aula) => aula.youtubeId).length;
        const percentual = curso.aulas.length ? (disponiveis / curso.aulas.length) * 100 : 0;

        return (
          <motion.article key={curso.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduzirMovimento ? undefined : { y: -7 }} transition={{ duration: 0.45, delay: index * 0.08 }} viewport={{ once: true }}>
            <Link href={`/tutoriais/${curso.slug}`} className="group relative flex min-h-[440px] flex-col overflow-hidden rounded-[1.6rem] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[var(--course-color)] hover:shadow-[0_22px_50px_rgba(26,42,31,0.12)]" style={{ "--course-color": `${curso.cor}55` } as React.CSSProperties}>
              <div className="relative flex h-52 items-center justify-center overflow-hidden" style={{ background: `linear-gradient(145deg, ${curso.cor}0d, ${curso.cor}30)` }}>
                <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(currentColor_0.7px,transparent_0.7px)] [background-size:20px_20px]" style={{ color: curso.cor }} />
                <span className="absolute -right-12 -top-12 h-40 w-40 rounded-full border" style={{ borderColor: `${curso.cor}20` }} />
                <span className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full border" style={{ borderColor: `${curso.cor}20` }} />

                {curso.destaque && <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-[#f5a623] px-3 py-1.5 text-[10px] font-bold text-white shadow-sm"><Sparkles size={11} /> Recomendado</span>}
                <span className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm" style={{ color: curso.cor }}>Trilha 0{index + 1}</span>

                <motion.div animate={reduzirMovimento ? undefined : { y: [0, -6, 0], rotate: [0, 2, 0] }} transition={{ duration: 3.6 + index * 0.3, repeat: Infinity, ease: "easeInOut" }} className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/70 bg-white/85 shadow-xl backdrop-blur-sm" style={{ color: curso.cor }}>
                  <Icone size={45} strokeWidth={1.65} />
                  {disponiveis > 0 && <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white text-white shadow-md" style={{ backgroundColor: curso.cor }}><Play size={14} fill="currentColor" /></span>}
                </motion.div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex flex-wrap gap-2 text-[10px] font-semibold"><span className="rounded-full px-2.5 py-1" style={{ color: curso.cor, backgroundColor: `${curso.cor}10` }}>{curso.categoria}</span><span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-500">{curso.nivel}</span></div>
                <h2 className="text-xl font-bold text-[#1a1a2e] transition-colors group-hover:text-[#1a8c3a]">{curso.titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{curso.descricao}</p>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-[11px]"><span className="flex items-center gap-1.5 text-gray-500"><PlayCircle size={14} style={{ color: curso.cor }} />{curso.aulas.length} {curso.aulas.length === 1 ? "aula" : "aulas"}</span><span className="font-medium text-gray-400">{disponiveis} disponíveis</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full transition-all" style={{ width: `${percentual}%`, background: `linear-gradient(90deg, ${curso.cor}, ${curso.cor}99)` }} /></div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">{disponiveis ? <CheckCircle2 size={14} className="text-[#1a8c3a]" /> : <Clock3 size={14} className="text-[#f5a623]" />}{disponiveis ? "Comece agora" : "Em preparação"}</span>
                  <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: curso.cor }}>Acessar curso <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
                </div>
              </div>
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}
