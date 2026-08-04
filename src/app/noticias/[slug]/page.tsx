"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, Share2, BookOpen, Expand, Images } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";
import noticiasData from "@/data/noticias.json";

export default function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a8c3a] mx-auto"></div>
          <p className="text-gray-500 mt-4">Carregando...</p>
        </div>
      </div>
    );
  }

  const noticia = noticiasData.noticias.find((n) => n.slug === slug);

  if (!noticia) {
    notFound();
  }

  // Lista de imagens: se tiver o array 'imagens', usa ele, senão usa só a principal
  const imagens = noticia.imagens 
    ? noticia.imagens.map((img: string) => `/images/noticias/${img}`)
    : [`/images/noticias/${noticia.imagem}`];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Botão voltar */}
        <Link
          href="/#noticias"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1a8c3a] transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Voltar para o início</span>
        </Link>

        {/* Card da notícia */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200">
          {/* Imagem principal */}
          <div className="relative h-72 md:h-96 group cursor-pointer" onClick={() => openLightbox(0)}>
            <Image
              src={`/images/noticias/${noticia.imagem}`}
              alt={noticia.titulo}
              width={800}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {noticia.destaque && (
              <span className="absolute top-4 right-4 bg-[#f5a623] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Destaque
              </span>
            )}

            <div className="absolute bottom-4 left-4 text-white">
              <span className="flex items-center gap-2 text-sm bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Calendar size={14} />
                {new Date(noticia.data).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* Indicador de múltiplas imagens */}
            {imagens.length > 1 && (
              <div className="absolute bottom-4 right-4 text-white text-xs bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                <Images size={12} />
                {imagens.length} fotos
              </div>
            )}

            {/* Botão de expandir */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30">
                <Expand size={32} className="text-white" />
              </div>
            </div>
          </div>

          {/* Miniaturas das outras imagens */}
          {imagens.length > 1 && (
            <div className="flex gap-2 p-4 bg-gray-50 border-t border-gray-200 overflow-x-auto">
              {imagens.map((img, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#1a8c3a] transition-all group"
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 bg-[#1a8c3a]/80 text-white text-[10px] text-center py-0.5">
                      Principal
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                </button>
              ))}
            </div>
          )}

          {/* Conteúdo */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {noticia.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#e8f5e9] text-[#1a8c3a] px-3 py-1 rounded-full flex items-center gap-1 border border-[#1a8c3a]/10"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              {noticia.titulo}
            </h1>

            <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
              <p>{noticia.texto}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={16} />
                  Secretaria de Educação
                </span>
                <span className="w-px h-4 bg-gray-300"></span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  {new Date(noticia.data).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: noticia.titulo,
                      text: noticia.resumo,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copiado para a área de transferência!');
                  }
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1a8c3a] hover:text-[#0d5c24] transition-colors bg-[#e8f5e9] px-4 py-2 rounded-full hover:bg-[#c8e6c9]"
              >
                <Share2 size={16} />
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={imagens}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}