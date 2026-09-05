"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper, Sparkles } from "lucide-react";

type Noticia = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  texto: string;
  imagem: string;
  data: string;
  tags: string[];
  destaque: boolean;
};

const INTERVALO = 5000;

export default function CarrosselNoticias({ noticias }: { noticias: Noticia[] }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [porPagina, setPorPagina] = useState(3);
  const [pausado, setPausado] = useState(false);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const arrastando = useRef(false);
  const arrastou = useRef(false);
  const inicioX = useRef(0);
  const inicioScroll = useRef(0);

  const ultimoIndice = Math.max(0, noticias.length - porPagina);

  useEffect(() => {
    const atualizarQuantidade = () => {
      const quantidade = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
      setPorPagina(quantidade);
      setIndiceAtual((atual) => Math.min(atual, Math.max(0, noticias.length - quantidade)));
    };

    atualizarQuantidade();
    window.addEventListener("resize", atualizarQuantidade);
    return () => window.removeEventListener("resize", atualizarQuantidade);
  }, [noticias.length]);

  useEffect(() => {
    const trilho = trilhoRef.current;
    const card = cardsRef.current[indiceAtual];
    if (!trilho || !card || arrastando.current) return;
    trilho.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, [indiceAtual, porPagina]);

  useEffect(() => {
    if (pausado || noticias.length <= porPagina) return;

    const timer = window.setTimeout(() => {
      setIndiceAtual((atual) => (atual >= ultimoIndice ? 0 : atual + 1));
    }, INTERVALO);

    return () => window.clearTimeout(timer);
  }, [indiceAtual, noticias.length, pausado, porPagina, ultimoIndice]);

  if (noticias.length === 0) return null;

  const finalizarArraste = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!arrastando.current) return;
    arrastando.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!arrastou.current) {
      setPausado(false);
      return;
    }

    const scroll = event.currentTarget.scrollLeft;
    let maisProximo = 0;
    let menorDistancia = Number.POSITIVE_INFINITY;
    cardsRef.current.slice(0, ultimoIndice + 1).forEach((card, indice) => {
      if (!card) return;
      const distancia = Math.abs(card.offsetLeft - scroll);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        maisProximo = indice;
      }
    });
    setIndiceAtual(maisProximo);
    cardsRef.current[maisProximo]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    window.setTimeout(() => setPausado(false), 350);
  };

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Notícias da educação"
      className="relative"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => {
        if (!arrastando.current) setPausado(false);
      }}
      onFocus={() => setPausado(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPausado(false);
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1a8c3a]/15 bg-[#e8f5e9] text-[#1a8c3a]">
            <Newspaper size={20} />
          </span>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a8c3a]">Painel de notícias</p>
            <p className="text-xs text-gray-400">Arraste para explorar</p>
          </div>
        </div>

        <Link href="/noticias" className="hidden items-center gap-2 text-sm font-semibold text-[#1a8c3a] transition-colors hover:text-[#0d5c24] sm:flex">
          Ver todas <ArrowRight size={16} />
        </Link>
      </div>

      <div
        ref={trilhoRef}
        className="news-track cursor-grab overflow-x-auto pb-5 active:cursor-grabbing"
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          arrastando.current = true;
          arrastou.current = false;
          inicioX.current = event.clientX;
          inicioScroll.current = event.currentTarget.scrollLeft;
          setPausado(true);
        }}
        onPointerMove={(event) => {
          if (!arrastando.current) return;
          const distancia = event.clientX - inicioX.current;
          if (!arrastou.current && Math.abs(distancia) <= 6) return;
          if (!arrastou.current) event.currentTarget.setPointerCapture(event.pointerId);
          arrastou.current = true;
          event.preventDefault();
          event.currentTarget.scrollLeft = inicioScroll.current - distancia;
        }}
        onPointerUp={finalizarArraste}
        onPointerCancel={finalizarArraste}
        onClickCapture={(event) => {
          if (arrastou.current) {
            event.preventDefault();
            event.stopPropagation();
            arrastou.current = false;
          }
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="flex gap-4 sm:gap-5 lg:gap-6">
          {noticias.map((noticia, indice) => (
            <Link
              key={noticia.id}
              ref={(elemento) => { cardsRef.current[indice] = elemento; }}
              href={`/noticias/${noticia.slug}`}
              draggable={false}
              className="group relative flex min-h-[390px] shrink-0 basis-full select-none flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#1a8c3a]/30 hover:shadow-[0_18px_40px_rgba(26,140,58,0.13)] sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <div className="relative h-52 overflow-hidden sm:h-56">
                <Image
                  src={`/images/noticias/${noticia.imagem}`}
                  alt={noticia.titulo}
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d5c24]/55 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-lg border border-white/50 bg-white/90 px-2.5 py-1 font-mono text-[9px] font-bold tracking-wider text-[#0d5c24] shadow-sm backdrop-blur-sm">
                  NEWS {String(indice + 1).padStart(2, "0")}
                </span>
                {noticia.destaque && (
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#f5a623] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                    <Sparkles size={11} /> Destaque
                  </span>
                )}
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#092d14]/65 px-2.5 py-1 text-[10px] text-white backdrop-blur-sm">
                  <CalendarDays size={12} className="text-[#f5c567]" />
                  {new Date(noticia.data).toLocaleDateString("pt-BR")}
                </span>
              </div>

              <div className="relative flex flex-1 flex-col p-5">
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-[#1a8c3a] to-[#f5a623] transition-all duration-500 group-hover:w-full" />
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {noticia.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-[#e8f5e9] px-2.5 py-1 text-[10px] font-medium text-[#1a8c3a]">#{tag}</span>
                  ))}
                </div>
                <h3 className="line-clamp-2 text-lg font-bold leading-snug text-[#1a1a2e] transition-colors group-hover:text-[#1a8c3a]">{noticia.titulo}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">{noticia.resumo}</p>
                <span className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-[#1a8c3a]">
                  Ler notícia
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1a8c3a]/15 bg-[#e8f5e9] transition-all group-hover:translate-x-1 group-hover:bg-[#1a8c3a] group-hover:text-white">
                    <ArrowRight size={15} />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {ultimoIndice > 0 && (
        <div className="flex items-center justify-center gap-2" aria-label={`Notícia ${indiceAtual + 1} de ${noticias.length}`}>
          {Array.from({ length: ultimoIndice + 1 }).map((_, indice) => (
            <button
              key={indice}
              type="button"
              onClick={() => setIndiceAtual(indice)}
              aria-label={`Mostrar notícias a partir da posição ${indice + 1}`}
              aria-current={indiceAtual === indice ? "true" : undefined}
              className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 ${indiceAtual === indice ? "w-14 bg-[#1a8c3a]/15" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
            >
              {indiceAtual === indice && (
                <span key={`${indiceAtual}-${pausado}`} className="block h-full bg-gradient-to-r from-[#1a8c3a] to-[#f5a623] motion-reduce:w-full" style={{ animation: `news-progress ${INTERVALO}ms linear forwards`, animationPlayState: pausado ? "paused" : "running" }} />
              )}
            </button>
          ))}
        </div>
      )}

      <Link href="/noticias" className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#1a8c3a]/15 bg-white px-4 py-3 text-sm font-semibold text-[#1a8c3a] sm:hidden">
        Ver todas as notícias <ArrowRight size={16} />
      </Link>

      <style jsx>{`
        .news-track {
          scrollbar-width: none;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
        }
        .news-track::-webkit-scrollbar { display: none; }
        @keyframes news-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
