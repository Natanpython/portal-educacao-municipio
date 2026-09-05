import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  Clock3,
  FileText,
  FolderOpen,
  Globe,
  Microscope,
  Palette,
  ScrollText,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GridConteudos from "@/components/materias/GridConteudos";
import materiasData from "@/data/materias.json";
import conteudosData from "@/data/conteudos.json";

const iconMap: Record<string, LucideIcon> = { BookOpen, Calculator, Microscope, ScrollText, Globe, Palette };

export default async function ConteudosPage({ searchParams }: { searchParams: Promise<{ materia?: string | string[] }> }) {
  const query = await searchParams;
  const materiaSlug = typeof query.materia === "string" ? query.materia : "";
  const materia = materiasData.materias.find((item) => item.slug === materiaSlug);

  if (!materia) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f5f5] px-4">
        <div className="max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <FolderOpen size={42} className="mx-auto text-gray-300" />
          <h1 className="mt-5 text-2xl font-bold text-[#1a1a2e]">Matéria não encontrada</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">Esta pasta não existe ou não está disponível na Biblioteca Digital.</p>
          <Link href="/materias" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1a8c3a] px-5 py-3 text-sm font-semibold text-white"><ArrowLeft size={16} /> Voltar para a biblioteca</Link>
        </div>
      </main>
    );
  }

  const conteudos = conteudosData.conteudos.filter((item) => item.materiaSlug === materiaSlug);
  const Icone = iconMap[materia.icone] ?? BookOpen;
  const outrasMaterias = materiasData.materias.filter((item) => item.slug !== materiaSlug);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f5f5]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full opacity-[0.07] blur-3xl" style={{ backgroundColor: materia.cor }} />
        <div className="absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-[#f5a623]/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-12">
        <nav aria-label="Navegação estrutural" className="mb-6 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/materias" className="transition-colors hover:text-[#1a8c3a]">Biblioteca</Link>
          <ArrowRight size={13} />
          <span className="font-medium" style={{ color: materia.cor }}>{materia.nome}</span>
        </nav>

        <section className="relative mb-9 pt-5">
          <span className="absolute left-7 top-0 h-8 w-40 rounded-t-3xl border border-b-0 bg-white" style={{ borderColor: `${materia.cor}35` }} />
          <div className="relative overflow-hidden rounded-[2rem] border bg-white p-6 shadow-[0_20px_55px_rgba(26,42,31,0.09)] md:p-9" style={{ borderColor: `${materia.cor}35` }}>
            <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${materia.cor}, ${materia.cor}88, #f5a623)` }} />
            <span className="absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-70" style={{ background: `radial-gradient(circle, ${materia.cor}18, transparent 68%)` }} />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border" style={{ color: materia.cor, backgroundColor: `${materia.cor}10`, borderColor: `${materia.cor}25` }}>
                <Icone size={43} strokeWidth={1.6} />
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"><Sparkles size={14} className="text-[#f5a623]" /></span>
              </div>

              <div className="flex-1">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: materia.cor }}>Pasta de conhecimento</p>
                <h1 className="mt-2 text-3xl font-bold text-[#1a1a2e] md:text-5xl">{materia.nome}</h1>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-500">{materia.descricao}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 md:w-56">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4"><FileText size={17} style={{ color: materia.cor }} /><p className="mt-2 text-2xl font-bold text-[#1a1a2e]">{conteudos.length}</p><p className="text-[11px] text-gray-400">{conteudos.length === 1 ? "material" : "materiais"}</p></div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4"><Clock3 size={17} className="text-[#f5a623]" /><p className="mt-2 text-sm font-bold text-[#1a1a2e]">Em breve</p><p className="text-[11px] text-gray-400">downloads</p></div>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: materia.cor }}>Conteúdo da pasta</p><h2 className="mt-1 text-2xl font-bold text-[#1a1a2e]">Materiais didáticos</h2></div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-500"><Clock3 size={13} style={{ color: materia.cor }} /> Arquivos em preparação</span>
        </div>

        {conteudos.length > 0 ? (
          <GridConteudos conteudos={conteudos} cor={materia.cor} />
        ) : (
          <section className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <FolderOpen size={42} className="mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl font-bold text-[#1a1a2e]">Esta pasta está sendo preparada</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">Os professores estão organizando os primeiros materiais desta matéria. Novos conteúdos aparecerão aqui.</p>
          </section>
        )}

        <section className="mt-12 border-t border-gray-200 pt-8">
          <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-[#1a8c3a]">Continue explorando</p><h2 className="mt-1 text-xl font-bold text-[#1a1a2e]">Outras pastas</h2></div><Link href="/materias" className="text-sm font-semibold text-[#1a8c3a] hover:text-[#0d5c24]">Ver biblioteca</Link></div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {outrasMaterias.map((item) => {
              const OutroIcone = iconMap[item.icone] ?? BookOpen;
              return <Link key={item.id} href={`/conteudos?materia=${item.slug}`} className="group flex min-w-48 items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"><span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ color: item.cor, backgroundColor: `${item.cor}10` }}><OutroIcone size={19} /></span><span className="text-sm font-semibold text-[#1a1a2e] group-hover:text-[#1a8c3a]">{item.nome}</span></Link>;
            })}
          </div>
        </section>

        <Link href="/materias" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-[#1a8c3a]"><ArrowLeft size={16} /> Voltar para a Biblioteca Digital</Link>
      </div>
    </main>
  );
}
