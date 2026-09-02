import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpenCheck, GraduationCap, PlayCircle } from "lucide-react";
import PlayerCurso from "@/components/tutoriais/PlayerCurso";
import tutoriaisData from "@/data/tutoriais.json";

type Props = PageProps<"/tutoriais/[slug]">;

export function generateStaticParams() {
  return tutoriaisData.cursos.map((curso) => ({ slug: curso.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const curso = tutoriaisData.cursos.find((item) => item.slug === slug);

  if (!curso) return { title: "Curso não encontrado | EduPortal" };

  return {
    title: `${curso.titulo} | Tutoriais`,
    description: curso.descricao,
  };
}

export default async function CursoPage({ params }: Props) {
  const { slug } = await params;
  const curso = tutoriaisData.cursos.find((item) => item.slug === slug);

  if (!curso) notFound();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f5f5]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-0 h-96 w-96 rounded-full opacity-5 blur-3xl"
          style={{ backgroundColor: curso.cor }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-10 md:py-14">
        <Link
          href="/tutoriais"
          className="group mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#1a8c3a]"
        >
          <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" />
          Voltar para os tutoriais
        </Link>

        <header className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
              style={{ color: curso.cor, backgroundColor: `${curso.cor}15` }}
            >
              <GraduationCap size={34} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-[#e8f5e9] px-3 py-1 text-[#1a8c3a]">{curso.categoria}</span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-500">{curso.nivel}</span>
              </div>
              <h1 className="mt-3 text-3xl font-bold text-[#1a1a2e] md:text-4xl">{curso.titulo}</h1>
              <p className="mt-2 max-w-3xl leading-relaxed text-gray-500">{curso.descricao}</p>
            </div>
            <div className="flex shrink-0 gap-4 rounded-xl bg-[#f8f9fa] px-5 py-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <PlayCircle size={16} className="text-[#f5a623]" />
                {curso.aulas.length} aulas
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpenCheck size={16} className="text-[#1a8c3a]" />
                Gratuito
              </span>
            </div>
          </div>
        </header>

        <PlayerCurso aulas={curso.aulas} />
      </div>
    </div>
  );
}
