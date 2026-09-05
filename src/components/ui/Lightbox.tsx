"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrev = useCallback(() => {
    setCurrentIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && images.length > 1) goToPrev();
      if (event.key === "ArrowRight" && images.length > 1) goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrev, images.length, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Galeria de imagens"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex flex-col bg-[#06130b]/95 p-3 backdrop-blur-md sm:p-5"
        onClick={onClose}
      >
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between pb-3 text-white">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[#4ade80]"><Images size={18} /></span>
            <div><p className="text-sm font-semibold">Galeria do evento</p><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">Registro fotográfico</p></div>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar galeria" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"><X size={22} /></button>
        </header>

        <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col" onClick={(event) => event.stopPropagation()}>
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{ opacity: 0.25, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                <Image src={images[currentIndex]} alt={`Foto ${currentIndex + 1} de ${images.length}`} fill sizes="100vw" className="object-contain" preload />
              </motion.div>
            </AnimatePresence>

            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-[10px] text-white/75 backdrop-blur-md">{String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>

            {images.length > 1 && (
              <>
                <button type="button" onClick={goToPrev} aria-label="Foto anterior" className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition-all hover:scale-105 hover:bg-[#1a8c3a] sm:left-4"><ChevronLeft size={24} /></button>
                <button type="button" onClick={goToNext} aria-label="Próxima foto" className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition-all hover:scale-105 hover:bg-[#1a8c3a] sm:right-4"><ChevronRight size={24} /></button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="lightbox-thumbs mt-3 flex shrink-0 justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
              {images.map((image, index) => (
                <button key={`${image}-${index}`} type="button" onClick={() => setCurrentIndex(index)} aria-label={`Ir para foto ${index + 1}`} aria-current={index === currentIndex ? "true" : undefined} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${index === currentIndex ? "border-[#4ade80] opacity-100" : "border-transparent opacity-45 hover:opacity-90"}`}>
                  <Image src={image} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <style jsx>{`.lightbox-thumbs { scrollbar-width: none; } .lightbox-thumbs::-webkit-scrollbar { display: none; }`}</style>
      </motion.div>
    </AnimatePresence>
  );
}
