"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Clock3,
  FileText,
  Globe,
  Microscope,
  Palette,
  Search,
  ScrollText,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Materia = { id: string; nome: string; slug: string; icone: string; cor: string; descricao: string };
type Conteudo = { id: string; materiaSlug: string; titulo: string; descricao: string; data: string; tags: string[] };
type Filtro = "todas" | "com-conteudo" | "em-preparacao";

const iconMap: Record<string, LucideIcon> = { BookOpen, Calculator, Microscope, ScrollText, Globe, Palette };

const cores: Record<string, { principal: string; suave: string; secundaria: string }> = {
  portugues: { principal: "#4f46e5", suave: "#eef2ff", secundaria: "#818cf8" },
  matematica: { principal: "#dc2626", suave: "#fef2f2", secundaria: "#f87171" },
  ciencias: { principal: "#16a34a", suave: "#f0fdf4", secundaria: "#4ade80" },
  historia: { principal: "#d97706", suave: "#fffbeb", secundaria: "#fbbf24" },
  geografia: { principal: "#059669", suave: "#ecfdf5", secundaria: "#34d399" },
  artes: { principal: "#7c3aed", suave: "#f5f3ff", secundaria: "#a78bfa" },
};

export default function GridMaterias({ materias, conteudos }: { materias: Materia[]; conteudos: Conteudo[] }) {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const reduzirMovimento = useReducedMotion();

  const materiasFiltradas = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return materias.filter((materia) => {
      const materiais = conteudos.filter((conteudo) => conteudo.materiaSlug === materia.slug);
      const correspondeFiltro = filtro === "todas" || (filtro === "com-conteudo" ? materiais.length > 0 : materiais.length === 0);
      const texto = [materia.nome, materia.descricao, ...materiais.flatMap((item) => [item.titulo, item.descricao, ...item.tags])].join(" ").toLocaleLowerCase("pt-BR");
      return correspondeFiltro && (!termo || texto.includes(termo));
    });
  }, [busca, conteudos, filtro, materias]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:flex sm:items-center sm:gap-3 sm:p-4">
        <label className="relative block flex-1">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1a8c3a]" />
          <span className="sr-only">Buscar matéria ou conteúdo</span>
          <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="O que você quer aprender hoje?" className="h-12 w-full rounded-xl border border-gray-200 bg-[#f8faf8] pl-11 pr-11 text-sm text-[#1a1a2e] outline-none transition-all placeholder:text-gray-400 focus:border-[#1a8c3a]/40 focus:bg-white focus:ring-4 focus:ring-[#1a8c3a]/5" />
          {busca && <button type="button" onClick={() => setBusca("")} aria-label="Limpar busca" className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"><X size={15} /></button>}
        </label>
        <div className="mt-3 flex gap-2 overflow-x-auto sm:mt-0">
          {([
            ["todas", "Todas"],
            ["com-conteudo", "Com materiais"],
            ["em-preparacao", "Em preparação"],
          ] as const).map(([valor, label]) => (
            <button key={valor} type="button" onClick={() => setFiltro(valor)} className={`h-10 shrink-0 rounded-xl px-3 text-xs font-semibold transition-colors ${filtro === valor ? "bg-[#1a8c3a] text-white shadow-md shadow-[#1a8c3a]/15" : "bg-gray-100 text-gray-500 hover:bg-[#e8f5e9] hover:text-[#1a8c3a]"}`}>{label}</button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between px-1 text-xs text-gray-400">
        <span>{materiasFiltradas.length} {materiasFiltradas.length === 1 ? "matéria encontrada" : "matérias encontradas"}</span>
        <span className="hidden items-center gap-1.5 font-mono uppercase tracking-wider sm:flex"><Sparkles size={12} className="text-[#f5a623]" /> Biblioteca atualizada</span>
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {materiasFiltradas.map((materia, index) => {
            const materiais = conteudos.filter((conteudo) => conteudo.materiaSlug === materia.slug);
            const cor = cores[materia.id] ?? cores.portugues;
            const Icone = iconMap[materia.icone] ?? BookOpen;

            return (
              <motion.article layout key={materia.id} initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.38, delay: Math.min(index * 0.05, 0.2) }} className="group relative pt-4">
                <span aria-hidden="true" className="absolute left-5 top-0 h-7 w-28 rounded-t-2xl border border-b-0" style={{ backgroundColor: cor.suave, borderColor: `${cor.principal}30` }} />
                <Link href={`/conteudos?materia=${materia.slug}`} className="relative flex min-h-[350px] flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(26,42,31,0.12)]" style={{ borderColor: `${cor.principal}30` }}>
                  <span className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${cor.principal}, ${cor.secundaria}, transparent)` }} />
                  <span className="absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-75 transition-transform duration-700 group-hover:scale-125" style={{ backgroundColor: cor.suave }} />

                  <div className="relative flex items-start justify-between">
                    <motion.span animate={reduzirMovimento ? undefined : { y: [0, -4, 0], rotate: [0, 2, 0] }} transition={{ duration: 3.5 + index * 0.2, repeat: Infinity, ease: "easeInOut" }} className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ color: cor.principal, backgroundColor: cor.suave }}><Icone size={27} /></motion.span>
                    <span className="rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: cor.principal, backgroundColor: cor.suave }}>{materiais.length > 0 ? `${materiais.length} ${materiais.length === 1 ? "material" : "materiais"}` : "Em breve"}</span>
                  </div>

                  <h2 className="relative mt-5 text-xl font-bold text-[#1a1a2e] transition-colors group-hover:text-[var(--subject-color)]" style={{ "--subject-color": cor.principal } as React.CSSProperties}>{materia.nome}</h2>
                  <p className="relative mt-1 text-sm leading-relaxed text-gray-500">{materia.descricao}</p>

                  <div className="relative mt-5 space-y-2">
                    {materiais.length > 0 ? materiais.slice(0, 2).map((material) => (
                      <div key={material.id} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/80 p-2.5 transition-colors group-hover:bg-white">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ color: cor.principal, backgroundColor: cor.suave }}><FileText size={15} /></span>
                        <span className="min-w-0"><span className="block truncate text-xs font-semibold text-[#1a1a2e]">{material.titulo}</span><span className="block text-[10px] text-gray-400">Material em preparação</span></span>
                      </div>
                    )) : (
                      <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-gray-200 bg-gray-50/70 p-3 text-xs text-gray-400"><Clock3 size={16} /> Novos materiais serão adicionados</div>
                    )}
                  </div>

                  <span className="relative mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold" style={{ color: cor.principal }}>
                    Abrir pasta <span className="flex h-8 w-8 items-center justify-center rounded-full transition-all group-hover:translate-x-1 group-hover:text-white" style={{ backgroundColor: cor.suave }}><ArrowRight size={15} /></span>
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {materiasFiltradas.length === 0 && (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center"><Search size={32} className="mx-auto text-gray-300" /><h2 className="mt-4 text-lg font-bold text-[#1a1a2e]">Nenhuma matéria encontrada</h2><p className="mt-1 text-sm text-gray-500">Tente outro termo ou altere o filtro selecionado.</p><button type="button" onClick={() => { setBusca(""); setFiltro("todas"); }} className="mt-5 rounded-xl bg-[#e8f5e9] px-4 py-2 text-sm font-semibold text-[#1a8c3a]">Limpar filtros</button></div>
      )}
    </div>
  );
}
