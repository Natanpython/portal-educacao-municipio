"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Camera,
  Expand,
  Images,
  Share2,
  Sparkles,
  Tag,
} from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";
import noticiasData from "@/data/noticias.json";

export default function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const noticia = noticiasData.noticias.find((item) => item.slug === slug);
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!noticia) notFound();

  const imagens = (noticia.imagens?.length ? noticia.imagens : [noticia.imagem]).map(
    (imagem) => `/images/noticias/${imagem}`,
  );

  const abrirLightbox = (indice: number) => {
    setLightboxIndex(indice);
    setLightboxOpen(true);
  };

  const compartilhar = async () => {
    const dados = { title: noticia.titulo, text: noticia.resumo, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(dados);
      else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiado para a área de transferência!");
      }
    } catch {
      // O usuário pode cancelar o compartilhamento sem que isso seja um erro da página.
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <section className="border-b border-[#1a8c3a]/10 bg-gradient-to-br from-white via-[#f8fbf8] to-[#edf8ef]">
        <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
          <Link href="/#noticias" className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#1a8c3a]">
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Voltar para notícias
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              {noticia.destaque && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5a623] px-3 py-1.5 text-xs font-bold text-white">
                  <Sparkles size={13} /> Destaque
                </span>
              )}
              {noticia.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-[#1a8c3a]/10 bg-white px-3 py-1.5 text-xs font-medium text-[#1a8c3a]">
                  <Tag size={11} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#1a1a2e] md:text-5xl">{noticia.titulo}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">{noticia.resumo}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-500">
              <span className="flex items-center gap-2"><CalendarDays size={17} className="text-[#1a8c3a]" />{new Date(noticia.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-2"><BookOpen size={17} className="text-[#1a8c3a]" />Secretaria de Educação</span>
              <button type="button" onClick={compartilhar} className="inline-flex items-center gap-2 rounded-full bg-[#e8f5e9] px-3 py-1.5 font-semibold text-[#1a8c3a] transition-colors hover:bg-[#c8e6c9]">
                <Share2 size={15} /> Compartilhar
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <section aria-label="Galeria do evento" className="overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-3 shadow-[0_22px_60px_rgba(13,92,36,0.1)] sm:p-4">
          <div className="mb-3 flex items-center justify-between px-1 sm:px-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f5e9] text-[#1a8c3a]"><Camera size={18} /></span>
              <div>
                <h2 className="text-sm font-bold text-[#1a1a2e]">Registro do evento</h2>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gray-400">Galeria fotográfica</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500">
              <Images size={14} className="text-[#1a8c3a]" /> {imagens.length} {imagens.length === 1 ? "foto" : "fotos"}
            </span>
          </div>

          <div className={`grid gap-3 ${imagens.length > 1 ? "lg:grid-cols-[minmax(0,1fr)_190px]" : ""}`}>
            <button type="button" onClick={() => abrirLightbox(imagemAtiva)} className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100 text-left md:aspect-[16/9]">
              <Image src={imagens[imagemAtiva]} alt={`${noticia.titulo} — foto ${imagemAtiva + 1}`} fill preload sizes="(max-width: 1024px) 100vw, 900px" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1.5 font-mono text-[10px] text-white backdrop-blur-md">FOTO {String(imagemAtiva + 1).padStart(2, "0")}</span>
              <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white opacity-100 backdrop-blur-md transition-all group-hover:scale-105 group-hover:bg-white/25 sm:opacity-0 sm:group-hover:opacity-100"><Expand size={20} /></span>
              <span aria-hidden="true" className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-white/70" />
              <span aria-hidden="true" className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-[#f5a623]" />
            </button>

            {imagens.length > 1 && (
              <div className="gallery-scroll flex gap-2 overflow-x-auto pb-1 lg:max-h-[520px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1">
                {imagens.map((imagem, indice) => (
                  <button key={`${imagem}-${indice}`} type="button" onClick={() => setImagemAtiva(indice)} aria-label={`Selecionar foto ${indice + 1}`} aria-current={imagemAtiva === indice ? "true" : undefined} className={`group/thumb relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:w-36 lg:w-full ${imagemAtiva === indice ? "border-[#1a8c3a] shadow-md shadow-[#1a8c3a]/10" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    <Image src={imagem} alt="" fill sizes="190px" className="object-cover transition-transform duration-300 group-hover/thumb:scale-105" />
                    <span className={`absolute bottom-1.5 right-1.5 rounded-md px-1.5 py-0.5 font-mono text-[9px] ${imagemAtiva === indice ? "bg-[#1a8c3a] text-white" : "bg-black/45 text-white"}`}>{String(indice + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {imagens.length > 1 && (
            <button type="button" onClick={() => abrirLightbox(imagemAtiva)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#1a8c3a]/15 bg-[#f5fbf6] px-4 py-3 text-sm font-semibold text-[#1a8c3a] transition-colors hover:bg-[#e8f5e9]">
              <Images size={17} /> Abrir galeria completa
            </button>
          )}
        </section>

        <article className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
            <span className="h-8 w-1 rounded-full bg-gradient-to-b from-[#1a8c3a] to-[#f5a623]" />
            <div><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a8c3a]">Cobertura</p><h2 className="text-xl font-bold text-[#1a1a2e]">Sobre o evento</h2></div>
          </div>
          <p className="text-base leading-8 text-gray-600 md:text-lg">{noticia.texto}</p>
        </article>
      </div>

      <Lightbox key={lightboxOpen ? lightboxIndex : "closed"} images={imagens} initialIndex={lightboxIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />

      <style jsx>{`
        .gallery-scroll { scrollbar-width: thin; scrollbar-color: #1a8c3a33 transparent; }
      `}</style>
    </main>
  );
}
