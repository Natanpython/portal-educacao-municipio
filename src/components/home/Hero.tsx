"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Code2,
  GraduationCap,
  Lightbulb,
  PlayCircle,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const palavras = ["tecnologia", "criatividade", "inovação", "oportunidades"];

const nucleos = [
  { label: "Robótica", icon: Bot, color: "#1a8c3a", bg: "#e8f5e9", className: "left-[2%] top-[16%]" },
  { label: "Programação", icon: Code2, color: "#2563eb", bg: "#e8f1ff", className: "right-[0%] top-[19%]" },
  { label: "Criatividade", icon: Lightbulb, color: "#e0961a", bg: "#fff3e0", className: "bottom-[10%] left-[7%]" },
  { label: "Comunidade", icon: Users, color: "#e04f8a", bg: "#fdebf3", className: "bottom-[8%] right-[2%]" },
];

export default function Hero() {
  const [palavraAtual, setPalavraAtual] = useState(0);
  const reduzirMovimento = useReducedMotion();

  useEffect(() => {
    if (reduzirMovimento) return;
    const timer = window.setInterval(() => {
      setPalavraAtual((atual) => (atual + 1) % palavras.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [reduzirMovimento]);

  return (
    <section className="relative flex min-h-[calc(82vh-4rem)] items-center overflow-hidden bg-gradient-to-br from-[#f7f8f7] via-white to-[#edf8ef]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-[540px] w-[540px] rounded-full border border-[#1a8c3a]/[0.07]" />
        <div className="absolute -right-12 -top-20 h-[380px] w-[380px] rounded-full border border-dashed border-[#f5a623]/10" />
        <div className="absolute -bottom-36 -left-28 h-96 w-96 rounded-full bg-[#1a8c3a]/5 blur-3xl" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#1a8c3a_0.65px,transparent_0.65px)] [background-size:28px_28px]" />
      </div>

      <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 py-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-12">
        <div className="text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 rounded-full border border-[#1a8c3a]/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1a8c3a] shadow-sm backdrop-blur-sm">
            <Sparkles size={14} className="text-[#f5a623]" /> Portal da Educação Municipal <Zap size={12} />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} className="mt-6 text-4xl font-bold leading-[1.08] text-[#1a1a2e] sm:text-5xl md:text-6xl lg:text-[4.2rem]">
            Transformando a <span className="text-gradient-institutional">educação</span> com{" "}
            <span className="relative inline-grid min-w-[5.5em] overflow-hidden align-bottom text-left text-[#1a8c3a]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={palavras[palavraAtual]} initial={reduzirMovimento ? false : { y: 38, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduzirMovimento ? undefined : { y: -38, opacity: 0 }} transition={{ duration: 0.38, ease: "easeOut" }} className="col-start-1 row-start-1">
                  {palavras[palavraAtual]}
                </motion.span>
              </AnimatePresence>
              <span aria-hidden="true" className="invisible col-start-1 row-start-1">oportunidades</span>
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600 lg:mx-0">
            Materiais, projetos e experiências produzidos para conectar professores, estudantes e toda a comunidade escolar.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/materias" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1a8c3a] px-7 py-4 font-semibold text-white shadow-lg shadow-[#1a8c3a]/25 transition-all hover:-translate-y-0.5 hover:bg-[#0d5c24] hover:shadow-xl">
              <BookOpen size={19} /> Explorar atividades <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/tutoriais" className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-[#1a8c3a]/25 bg-white px-7 py-4 font-semibold text-[#1a8c3a] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1a8c3a]/50 hover:bg-[#e8f5e9]">
              <PlayCircle size={19} /> Ver tutoriais
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 lg:justify-start">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f5e9] text-[#1a8c3a]"><GraduationCap size={13} /></span>
            Conteúdo gratuito e acessível para toda a rede
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.18 }} className="relative mx-auto aspect-square w-full max-w-[540px]">
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-[#1a8c3a]/10" />
          <div aria-hidden="true" className="absolute inset-[20%] rounded-full border border-dashed border-[#1a8c3a]/15" />
          <motion.div aria-hidden="true" animate={reduzirMovimento ? undefined : { rotate: 360 }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} className="absolute inset-[8%] rounded-full border border-transparent">
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5a623] shadow-[0_0_18px_rgba(245,166,35,0.7)]" />
            <span className="absolute bottom-[10%] left-[9%] h-2.5 w-2.5 rounded-full bg-[#4ade80] shadow-[0_0_16px_rgba(74,222,128,0.6)]" />
          </motion.div>

          <svg aria-hidden="true" viewBox="0 0 540 540" className="absolute inset-0 h-full w-full">
            <path d="M270 270 L95 110 M270 270 L448 118 M270 270 L108 430 M270 270 L444 435" fill="none" stroke="#1a8c3a" strokeOpacity=".13" strokeWidth="2" strokeDasharray="5 7" />
            {!reduzirMovimento && <><circle r="4" fill="#1a8c3a"><animateMotion dur="3.5s" repeatCount="indefinite" path="M270 270 L95 110" /></circle><circle r="4" fill="#2563eb"><animateMotion dur="4s" repeatCount="indefinite" path="M270 270 L448 118" /></circle><circle r="4" fill="#e0961a"><animateMotion dur="3.7s" repeatCount="indefinite" path="M270 270 L108 430" /></circle><circle r="4" fill="#e04f8a"><animateMotion dur="4.2s" repeatCount="indefinite" path="M270 270 L444 435" /></circle></>}
          </svg>

          <motion.div animate={reduzirMovimento ? undefined : { y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2.5rem] border border-[#1a8c3a]/20 bg-white/90 text-center shadow-[0_28px_70px_rgba(13,92,36,0.18)] backdrop-blur-md sm:h-48 sm:w-48">
            <span className="absolute inset-3 rounded-[2rem] border border-dashed border-[#1a8c3a]/15" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a8c3a] to-[#0d5c24] text-white shadow-lg shadow-[#1a8c3a]/20"><GraduationCap size={32} /></span>
            <p className="relative mt-3 font-bold text-[#1a1a2e]">Educação</p>
            <p className="relative font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a8c3a]">Conectando futuros</p>
          </motion.div>

          {nucleos.map((nucleo, index) => {
            const Icone = nucleo.icon;
            return (
              <motion.div key={nucleo.label} animate={reduzirMovimento ? undefined : { y: [0, index % 2 === 0 ? -8 : 8, 0], rotate: [0, index % 2 === 0 ? -1.5 : 1.5, 0] }} transition={{ duration: 3.6 + index * 0.35, repeat: Infinity, ease: "easeInOut" }} className={`absolute ${nucleo.className} flex min-w-32 items-center gap-2.5 rounded-2xl border bg-white/90 p-3 shadow-[0_14px_35px_rgba(26,42,31,0.12)] backdrop-blur-md sm:min-w-36 sm:p-3.5`} style={{ borderColor: `${nucleo.color}25` }}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ color: nucleo.color, backgroundColor: nucleo.bg }}><Icone size={20} /></span>
                <div><p className="text-xs font-bold text-[#1a1a2e] sm:text-sm">{nucleo.label}</p><p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-gray-400">Núcleo 0{index + 1}</p></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
