import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Newspaper } from "lucide-react";
import noticiasData from "@/data/noticias.json";

export const metadata: Metadata = {
  title: "Notícias | EduPortal",
  description: "Notícias e novidades da rede municipal de educação.",
};

export default function NoticiasPage() {
  const noticias = [...noticiasData.noticias].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
  );

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Link href="/" className="group mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#1a8c3a]">
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Voltar para o início
        </Link>

        <header className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f5e9] px-3 py-1.5 text-sm font-semibold text-[#1a8c3a]">
            <Newspaper size={16} /> Notícias
          </span>
          <h1 className="mt-4 text-3xl font-bold text-[#1a1a2e] md:text-4xl">Acontece na educação municipal</h1>
          <p className="mt-2 max-w-2xl text-gray-500">Acompanhe projetos, eventos e conquistas da nossa comunidade escolar.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <Link href={`/noticias/${noticia.slug}`} className="block h-full">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={`/images/noticias/${noticia.imagem}`}
                    alt={noticia.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {noticia.destaque && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#f5a623] px-3 py-1 text-xs font-bold text-white">Destaque</span>
                  )}
                </div>

                <div className="p-5">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={13} />
                    {new Date(noticia.data).toLocaleDateString("pt-BR")}
                  </span>
                  <h2 className="mt-3 text-xl font-bold text-[#1a1a2e] transition-colors group-hover:text-[#1a8c3a]">{noticia.titulo}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">{noticia.resumo}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1a8c3a]">
                    Ler notícia
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
