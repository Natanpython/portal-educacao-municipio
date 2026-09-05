"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock3, ListVideo, LockKeyhole, Maximize2, Minimize2, Play, Radio, Video } from "lucide-react";

type Aula = { id: string; titulo: string; descricao: string; duracao: string; youtubeId: string };

export default function PlayerCurso({ aulas, cor }: { aulas: Aula[]; cor: string }) {
  const primeiraDisponivel = aulas.findIndex((aula) => aula.youtubeId);
  const [aulaAtual, setAulaAtual] = useState(primeiraDisponivel >= 0 ? primeiraDisponivel : 0);
  const [modoFoco, setModoFoco] = useState(false);
  const aula = aulas[aulaAtual];
  const disponiveis = aulas.filter((item) => item.youtubeId).length;
  const temAnterior = aulaAtual > 0;
  const temProxima = aulaAtual < aulas.length - 1;

  return (
    <div className={modoFoco ? "space-y-6" : "grid gap-6 lg:grid-cols-[minmax(0,1fr)_370px]"}>
      <section className="overflow-hidden rounded-[1.6rem] border border-gray-200 bg-white shadow-[0_18px_50px_rgba(26,42,31,0.09)]">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0b2012] px-4 py-3 text-white">
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/55"><Radio size={13} style={{ color: cor }} /> Sala de aprendizagem</span>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/60">Aula {String(aulaAtual + 1).padStart(2, "0")}</span>
            <button type="button" onClick={() => setModoFoco((atual) => !atual)} aria-label={modoFoco ? "Sair do modo foco" : "Ativar modo foco"} className="flex h-7 items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-2 text-[10px] text-white/65 transition-colors hover:bg-white/20 hover:text-white">
              {modoFoco ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
              <span className="hidden sm:inline">{modoFoco ? "Reduzir" : "Modo foco"}</span>
            </button>
          </div>
        </div>

        <div className="relative aspect-video bg-[#102616]">
          {aula.youtubeId ? (
            <iframe key={aula.youtubeId} className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${aula.youtubeId}?rel=0`} title={aula.titulo} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-6 text-center text-white">
              <span className="absolute h-72 w-72 rounded-full border border-white/5" />
              <span className="absolute h-48 w-48 rounded-full border border-dashed border-white/10" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10"><Video size={30} style={{ color: cor }} /></div>
              <p className="relative mt-4 text-xl font-bold">Aula em preparação</p>
              <p className="relative mt-2 max-w-md text-sm leading-relaxed text-white/55">O vídeo está sendo preparado pela Secretaria de Educação e será publicado nesta trilha.</p>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: cor }}><Play size={14} fill="currentColor" /> Módulo {aulaAtual + 1} de {aulas.length}</div>
          <h2 className="mt-2 text-2xl font-bold text-[#1a1a2e] md:text-3xl">{aula.titulo}</h2>
          <p className="mt-3 leading-relaxed text-gray-500">{aula.descricao}</p>
          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${((aulaAtual + 1) / aulas.length) * 100}%`, backgroundColor: cor }} /></div>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-5">
            <button type="button" disabled={!temAnterior} onClick={() => setAulaAtual((atual) => atual - 1)} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft size={15} /> Anterior</button>
            <span className="hidden text-center font-mono text-[9px] uppercase tracking-[0.16em] text-gray-400 sm:block">{Math.round(((aulaAtual + 1) / aulas.length) * 100)}% da trilha</span>
            <button type="button" disabled={!temProxima} onClick={() => setAulaAtual((atual) => atual + 1)} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35" style={{ backgroundColor: cor }}>Próxima <ChevronRight size={15} /></button>
          </div>
        </div>
      </section>

      <aside className={`h-fit overflow-hidden rounded-[1.6rem] border border-gray-200 bg-white shadow-sm ${modoFoco ? "mx-auto w-full max-w-5xl" : ""}`}>
        <header className="border-b border-gray-100 p-5">
          <div className="flex items-center justify-between"><span className="flex items-center gap-2 font-bold text-[#1a1a2e]"><ListVideo size={20} style={{ color: cor }} /> Trilha do curso</span><span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ color: cor, backgroundColor: `${cor}12` }}>{aulas.length} aulas</span></div>
          <p className="mt-2 text-xs text-gray-400">{disponiveis} de {aulas.length} aulas disponíveis</p>
        </header>

        <div className={`max-h-[610px] overflow-y-auto p-2 ${modoFoco ? "grid gap-1 md:grid-cols-2" : ""}`}>
          {aulas.map((item, index) => {
            const ativa = index === aulaAtual;
            const disponivel = Boolean(item.youtubeId);
            return (
              <button key={item.id} type="button" onClick={() => setAulaAtual(index)} aria-pressed={ativa} className={`group/item relative w-full rounded-xl p-3 text-left transition-all ${ativa ? "bg-[var(--lesson-light)]" : "hover:bg-gray-50"}`} style={{ "--lesson-light": `${cor}10` } as React.CSSProperties}>
                {ativa && <span className="absolute bottom-3 left-0 top-3 w-1 rounded-full" style={{ backgroundColor: cor }} />}
                <div className="flex gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${ativa ? "text-white" : "bg-gray-100 text-gray-500"}`} style={ativa ? { backgroundColor: cor } : undefined}>{ativa && disponivel ? <Play size={14} fill="currentColor" /> : index + 1}</span>
                  <span className="min-w-0 flex-1"><span className={`block text-sm font-semibold leading-snug ${ativa ? "text-[#1a1a2e]" : "text-gray-700"}`}>{item.titulo}</span><span className="mt-1.5 flex items-center gap-1.5 text-[11px] text-gray-400">{disponivel ? <><CheckCircle2 size={12} className="text-[#1a8c3a]" />{item.duracao}</> : <><LockKeyhole size={12} />Em breve</>}</span></span>
                </div>
              </button>
            );
          })}
        </div>

        <footer className="flex items-center gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-3 text-[11px] text-gray-400"><Clock3 size={13} /> Novas aulas são adicionadas gradualmente</footer>
      </aside>
    </div>
  );
}
