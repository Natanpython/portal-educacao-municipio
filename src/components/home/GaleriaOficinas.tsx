"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Atom,
  BookOpen,
  Bot,
  Camera,
  Code2,
  Cpu,
  Lightbulb,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

const oficinas = [
  { id: 1, titulo: "Oficina de Robótica", descricao: "Construção, sensores e criatividade", etiqueta: "Robótica", cor: "#1a8c3a", suave: "#e8f5e9", secundaria: "#4ade80", icone: Bot },
  { id: 2, titulo: "Laboratório de Tecnologia", descricao: "Experimentação e cultura digital", etiqueta: "Tecnologia", cor: "#2563eb", suave: "#e8f1ff", secundaria: "#60a5fa", icone: Cpu },
  { id: 3, titulo: "Aula de Programação", descricao: "Lógica, jogos e novas ideias", etiqueta: "Código", cor: "#7c3aed", suave: "#f1eafe", secundaria: "#a78bfa", icone: Code2 },
  { id: 4, titulo: "Oficina de Leitura", descricao: "Histórias, imaginação e descoberta", etiqueta: "Leitura", cor: "#e04f8a", suave: "#fdebf3", secundaria: "#f472b6", icone: BookOpen },
  { id: 5, titulo: "Robótica Educacional", descricao: "Projetos que aprendem e se movem", etiqueta: "Inovação", cor: "#0891b2", suave: "#e5f7fa", secundaria: "#22d3ee", icone: Sparkles },
  { id: 6, titulo: "Artes e Tecnologia", descricao: "Expressão criativa com ferramentas digitais", etiqueta: "Criatividade", cor: "#e0961a", suave: "#fff3dc", secundaria: "#f5a623", icone: Palette },
];

const ORDEM_INICIAL = oficinas.map((oficina) => oficina.id);

export default function GaleriaOficinas() {
  const [ordem, setOrdem] = useState(ORDEM_INICIAL);
  const [pausado, setPausado] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const reduzirMovimento = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const atualizar = () => setDesktop(media.matches);
    atualizar();
    media.addEventListener("change", atualizar);
    return () => media.removeEventListener("change", atualizar);
  }, []);

  useEffect(() => {
    if (!desktop || pausado || reduzirMovimento) return;

    const timer = window.setInterval(() => {
      setOrdem((atual) => [...atual.slice(1), atual[0]]);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [desktop, pausado, reduzirMovimento]);

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#1a8c3a]/[0.06]" />
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-[#f5a623]/10" />
        <div className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-[#1a8c3a]/5 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#7c3aed]/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-3xl text-center">
          <span className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#1a8c3a]"><Camera size={16} /> Galeria de Oficinas</span>
          <h2 className="mt-2 text-3xl font-bold text-[#1a1a2e] md:text-4xl">Nossas <span className="text-[#1a8c3a]">oficinas</span> tecnológicas</h2>
          <p className="mt-4 text-gray-500">Um ecossistema vivo de criatividade, tecnologia e aprendizagem</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#1a8c3a]/10 bg-white px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gray-400 shadow-sm">
            <span className={`h-1.5 w-1.5 rounded-full bg-[#4ade80] ${!pausado && desktop && !reduzirMovimento ? "animate-pulse" : ""}`} />
            {pausado ? "Movimento pausado" : "Ecossistema em movimento"}
          </div>
        </motion.div>

        <div
          className="oficinas-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          onFocus={() => setPausado(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPausado(false);
          }}
        >
          {ordem.map((id, posicao) => {
            const oficina = oficinas.find((item) => item.id === id)!;
            const Icone = oficina.icone;
            const emFoco = posicao === 0;

            return (
              <motion.article
                layout
                key={oficina.id}
                transition={{ layout: { type: "spring", stiffness: 115, damping: 20 } }}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={reduzirMovimento ? undefined : { y: -8, rotate: posicao % 2 === 0 ? -0.7 : 0.7 }}
                className="group relative min-h-[330px] w-[82vw] max-w-[350px] shrink-0 snap-center overflow-hidden rounded-[1.6rem] border bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:shadow-[0_22px_50px_rgba(26,42,31,0.13)] sm:w-[340px] lg:w-auto lg:max-w-none"
                style={{ borderColor: `${oficina.cor}2e` }}
              >
                <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${oficina.cor}, ${oficina.secundaria}, transparent)` }} />
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-60 blur-2xl transition-transform duration-700 group-hover:scale-125" style={{ backgroundColor: oficina.suave }} />

                <div className="relative flex h-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    <motion.div animate={reduzirMovimento ? undefined : { y: [0, -5, 0], rotate: [0, 2, 0] }} transition={{ duration: 3.4 + posicao * 0.25, repeat: Infinity, ease: "easeInOut" }} className="relative flex h-20 w-20 items-center justify-center rounded-3xl border" style={{ color: oficina.cor, backgroundColor: oficina.suave, borderColor: `${oficina.cor}24` }}>
                      <Icone size={38} strokeWidth={1.7} />
                      <motion.span animate={reduzirMovimento ? undefined : { rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute -inset-2 rounded-[1.8rem] border border-dashed" style={{ borderColor: `${oficina.cor}35` }} />
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md" style={{ color: oficina.cor }}><Zap size={13} fill="currentColor" /></span>
                    </motion.div>

                    <span className="rounded-full px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: oficina.cor, backgroundColor: oficina.suave }}>{oficina.etiqueta}</span>
                  </div>

                  <div className="mt-8">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-400">Núcleo {String(oficina.id).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-xl font-bold text-[#1a1a2e] transition-colors">{oficina.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{oficina.descricao}</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
                    <span className="flex items-center gap-2 text-xs font-semibold" style={{ color: oficina.cor }}><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: oficina.cor }} /> Aprender fazendo</span>
                    <div className="flex -space-x-1.5">
                      {[Lightbulb, Atom, Sparkles].map((MiniIcone, indice) => (
                        <span key={indice} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white" style={{ color: oficina.cor, backgroundColor: oficina.suave }}><MiniIcone size={11} /></span>
                      ))}
                    </div>
                  </div>
                </div>

                {emFoco && desktop && !reduzirMovimento && <span className="absolute bottom-0 left-0 h-0.5 animate-[oficina-progress_4.8s_linear_forwards] bg-gradient-to-r from-[#1a8c3a] to-[#f5a623]" />}
              </motion.article>
            );
          })}
        </div>

        <p className="mt-3 text-center text-xs text-gray-400 lg:hidden">Deslize para conhecer todas as oficinas</p>
      </div>

      <style jsx>{`
        .oficinas-track { scrollbar-width: none; }
        .oficinas-track::-webkit-scrollbar { display: none; }
        @keyframes oficina-progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </section>
  );
}
