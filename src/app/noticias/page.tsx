import noticiasData from "@/data/noticias.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, Share2, BookOpen } from "lucide-react";

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noticia = noticiasData.noticias.find((n) => n.slug === slug);

  if (!noticia) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
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
          {/* Imagem com overlay */}
          <div className="relative h-72 md:h-96">
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
          </div>

          {/* Conteúdo */}
          <div className="p-6 md:p-8">
            {/* Tags */}
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

            {/* Título */}
            <h1 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              {noticia.titulo}
            </h1>

            {/* Texto completo */}
            <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
              <p>{noticia.texto}</p>
            </div>

            {/* Footer da notícia */}
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
    </div>
  );
}
