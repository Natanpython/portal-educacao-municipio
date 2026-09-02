import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code2,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Curso = {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string;
  nivel: string;
  cor: string;
  icone: string;
  destaque: boolean;
  aulas: Array<{ id: string }>;
};

const icones: Record<string, LucideIcon> = {
  Bot,
  Code2,
  GraduationCap,
};

export default function GridCursos({ cursos }: { cursos: Curso[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cursos.map((curso) => {
        const Icone = icones[curso.icone] ?? GraduationCap;

        return (
          <Link
            key={curso.id}
            href={`/tutoriais/${curso.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1a8c3a]/30 hover:shadow-xl"
          >
            <div
              className="relative flex min-h-52 items-center justify-center overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${curso.cor}18, ${curso.cor}38)` }}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/50" />
              <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full border border-white/50" />

              {curso.destaque && (
                <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#f5a623] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  <Sparkles size={12} /> Destaque
                </span>
              )}

              <div
                className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/70 bg-white/80 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
                style={{ color: curso.cor }}
              >
                <Icone size={48} strokeWidth={1.7} />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className="rounded-full px-2.5 py-1 font-semibold"
                  style={{ color: curso.cor, backgroundColor: `${curso.cor}12` }}
                >
                  {curso.categoria}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-500">
                  {curso.nivel}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#1a1a2e] transition-colors group-hover:text-[#1a8c3a]">
                {curso.titulo}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                {curso.descricao}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <PlayCircle size={16} style={{ color: curso.cor }} />
                  {curso.aulas.length} {curso.aulas.length === 1 ? "aula" : "aulas"}
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-[#1a8c3a]">
                  Acessar curso
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
