"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Bot,
  GraduationCap,
  Network,
  School,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const indicadores = [
  { icon: School, label: "Escolas", value: "40", description: "unidades conectadas", color: "#1a8c3a", light: "#e8f5e9", position: "md:col-start-2 md:row-start-1" },
  { icon: Users, label: "Alunos", value: "85", description: "estudantes alcançados", color: "#e0961a", light: "#fff3e0", position: "md:col-start-1 md:row-start-2" },
  { icon: BookOpen, label: "Materiais", value: "50+", description: "recursos educacionais", color: "#2563eb", light: "#e8f1ff", position: "md:col-start-3 md:row-start-2" },
  { icon: Bot, label: "Projetos", value: "20", description: "iniciativas em atividade", color: "#e04f8a", light: "#fdebf3", position: "md:col-start-2 md:row-start-3" },
];

export default function SobreEducacao() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-[#1a8c3a]/5 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#f5a623]/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1a8c3a]/15 bg-[#e8f5e9] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1a8c3a]">
            <GraduationCap size={15} /> Nossa Educação <Sparkles size={13} className="text-[#f5a623]" />
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-[#1a1a2e] md:text-4xl lg:text-5xl">
            Uma rede que conecta <span className="text-gradient-institutional">pessoas e oportunidades</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 md:text-lg">
            A educação municipal integra escolas, estudantes, projetos e materiais em um ecossistema criado para transformar aprendizagem em novas possibilidades.
          </p>

          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#1a8c3a]/10 bg-[#f8fbf8] p-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#1a8c3a] shadow-sm"><Zap size={17} /></span>
            <div><p className="text-sm font-bold text-[#1a1a2e]">Tecnologia com propósito</p><p className="mt-1 text-sm leading-relaxed text-gray-500">Cada conexão fortalece o trabalho de professores e amplia as experiências dos nossos alunos.</p></div>
          </div>

          <a href="#noticias" className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#1a8c3a]">
            Acompanhar nossa rede <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }} className="relative mx-auto w-full max-w-3xl">
          <div aria-hidden="true" className="absolute inset-12 hidden rounded-[45%] border border-[#1a8c3a]/10 md:block" />
          <svg aria-hidden="true" viewBox="0 0 600 520" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block">
            <defs>
              <linearGradient id="education-line" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1a8c3a" stopOpacity=".32" /><stop offset="1" stopColor="#f5a623" stopOpacity=".22" /></linearGradient>
            </defs>
            <path d="M300 260 L300 88 M300 260 L95 260 M300 260 L505 260 M300 260 L300 432" fill="none" stroke="url(#education-line)" strokeWidth="2" strokeDasharray="5 7" />
            {!reduzirMovimento && (
              <>
                <circle r="5" fill="#1a8c3a"><animateMotion dur="3.2s" repeatCount="indefinite" path="M300 260 L300 88" /></circle>
                <circle r="5" fill="#f5a623"><animateMotion dur="3.8s" repeatCount="indefinite" path="M300 260 L95 260" /></circle>
                <circle r="5" fill="#2563eb"><animateMotion dur="3.5s" repeatCount="indefinite" path="M300 260 L505 260" /></circle>
                <circle r="5" fill="#e04f8a"><animateMotion dur="4s" repeatCount="indefinite" path="M300 260 L300 432" /></circle>
              </>
            )}
          </svg>

          <div className="grid gap-3 md:grid-cols-3 md:grid-rows-3 md:gap-5">
            <motion.div animate={reduzirMovimento ? undefined : { scale: [1, 1.025, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 flex min-h-40 flex-col items-center justify-center rounded-[2rem] border border-[#1a8c3a]/20 bg-gradient-to-br from-[#0d5c24] to-[#1a8c3a] p-5 text-center text-white shadow-[0_20px_45px_rgba(13,92,36,0.22)] md:col-start-2 md:row-start-2">
              <span className="absolute inset-2 rounded-[1.55rem] border border-white/10" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f5a623]/30 bg-white/10 text-[#f5a623]"><Network size={25} /></span>
              <p className="relative mt-3 font-bold">Rede Municipal</p>
              <p className="relative mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">Educação conectada</p>
            </motion.div>

            {indicadores.map((indicador, index) => {
              const Icone = indicador.icon;
              return (
                <motion.article layout key={indicador.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduzirMovimento ? undefined : { y: -6, scale: 1.02 }} transition={{ duration: 0.45, delay: index * 0.08 }} viewport={{ once: true }} className={`group relative z-10 min-h-40 overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-xl ${indicador.position}`} style={{ borderColor: `${indicador.color}28` }}>
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-80 transition-transform duration-500 group-hover:scale-125" style={{ backgroundColor: indicador.light }} />
                  <div className="relative flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ color: indicador.color, backgroundColor: indicador.light }}><Icone size={22} /></span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-300">0{index + 1}</span>
                  </div>
                  <div className="relative mt-4"><p className="text-3xl font-bold text-[#1a1a2e]">{indicador.value}</p><p className="text-sm font-semibold" style={{ color: indicador.color }}>{indicador.label}</p><p className="mt-1 text-[11px] text-gray-400">{indicador.description}</p></div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
