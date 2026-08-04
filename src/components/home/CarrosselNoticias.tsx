"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

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

interface CarrosselNoticiasProps {
  noticias: Noticia[];
}

export default function CarrosselNoticias({ noticias }: CarrosselNoticiasProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const isResizing = useRef(false);

  const total = noticias.length;
  const maxSlide = Math.max(0, total - slidesToShow);

  // Detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      isResizing.current = true;
      let newSlidesToShow = 3;
      if (window.innerWidth < 640) newSlidesToShow = 1;
      else if (window.innerWidth < 1024) newSlidesToShow = 2;
      
      setSlidesToShow(newSlidesToShow);
      
      const newMaxSlide = Math.max(0, total - newSlidesToShow);
      if (currentSlide > newMaxSlide) {
        setCurrentSlide(0);
      }
      
      setTimeout(() => {
        isResizing.current = false;
      }, 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [total, currentSlide]);

  // Autoplay - PARA NO ÚLTIMO CARD
  useEffect(() => {
    if (isPaused || total <= slidesToShow || isResizing.current) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= maxSlide) {
          return prev; // permanece no último
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, total, slidesToShow, maxSlide]);

  const goToPrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (total === 0) return null;

  return (
    <div className="relative w-full">
      {/* Carrossel */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-4 md:gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
          }}
        >
          {noticias.map((noticia) => (
            <Link
              key={noticia.id}
              href={`/noticias/${noticia.slug}`}
              className="group flex-shrink-0"
              style={{
                flex: `0 0 calc(${100 / slidesToShow}% - 16px)`,
              }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#1a8c3a]/30 h-full">
                <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                  <Image
                    src={`/images/noticias/${noticia.imagem}`}
                    alt={noticia.titulo}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  {noticia.destaque && (
                    <span className="absolute top-3 right-3 bg-[#f5a623] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                      Destaque
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                    <span className="text-white text-xs sm:text-sm flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(noticia.data).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-5">
                  <h3 className="text-sm sm:text-lg font-bold text-[#1a1a2e] group-hover:text-[#1a8c3a] transition-colors line-clamp-2">
                    {noticia.titulo}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
                    {noticia.resumo}
                  </p>
                  <div className="mt-2 sm:mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {noticia.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] sm:text-xs bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[#1a8c3a] text-xs sm:text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ler mais
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Botões de navegação */}
      {total > slidesToShow && (
        <>
          <button
            onClick={goToPrev}
            className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white transition-all z-10 border border-gray-200 hover:border-[#1a8c3a]/30 ${
              currentSlide === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
            }`}
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={20} className="text-[#1a1a2e]" />
          </button>

          <button
            onClick={goToNext}
            className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white transition-all z-10 border border-gray-200 hover:border-[#1a8c3a]/30 ${
              currentSlide >= maxSlide ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
            }`}
            disabled={currentSlide >= maxSlide}
          >
            <ChevronRight size={20} className="text-[#1a1a2e]" />
          </button>
        </>
      )}

      {/* Indicadores */}
      {total > slidesToShow && (
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                index === currentSlide ? "w-6 sm:w-8 bg-[#1a8c3a]" : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}