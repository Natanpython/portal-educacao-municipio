"use client";

import { useState } from "react";
import { CheckCircle2, Clock3, ListVideo, Play, Video } from "lucide-react";

type Aula = {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  youtubeId: string;
};

export default function PlayerCurso({ aulas }: { aulas: Aula[] }) {
  const primeiraDisponivel = aulas.findIndex((aula) => aula.youtubeId);
  const [aulaAtual, setAulaAtual] = useState(primeiraDisponivel >= 0 ? primeiraDisponivel : 0);
  const aula = aulas[aulaAtual];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="aspect-video bg-[#102616]">
          {aula.youtubeId ? (
            <iframe
              key={aula.youtubeId}
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${aula.youtubeId}?rel=0`}
              title={aula.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center text-white">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Video size={32} className="text-[#f5a623]" />
              </div>
              <p className="text-xl font-bold">Aula em preparação</p>
              <p className="mt-2 max-w-md text-sm text-white/60">
                O vídeo desta aula será disponibilizado em breve pela Secretaria de Educação.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1a8c3a]">
            <Play size={15} fill="currentColor" />
            Aula {aulaAtual + 1}
          </div>
          <h2 className="mt-2 text-2xl font-bold text-[#1a1a2e]">{aula.titulo}</h2>
          <p className="mt-3 leading-relaxed text-gray-500">{aula.descricao}</p>
        </div>
      </section>

      <aside className="h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <span className="flex items-center gap-2 font-bold text-[#1a1a2e]">
            <ListVideo size={20} className="text-[#1a8c3a]" />
            Aulas do curso
          </span>
          <span className="rounded-full bg-[#e8f5e9] px-2.5 py-1 text-xs font-semibold text-[#1a8c3a]">
            {aulas.length}
          </span>
        </div>

        <div className="max-h-[590px] divide-y divide-gray-100 overflow-y-auto">
          {aulas.map((item, index) => {
            const ativa = index === aulaAtual;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setAulaAtual(index)}
                className={`w-full p-4 text-left transition-colors ${
                  ativa ? "bg-[#e8f5e9]" : "hover:bg-gray-50"
                }`}
                aria-pressed={ativa}
              >
                <div className="flex gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      ativa ? "bg-[#1a8c3a] text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {ativa ? <Play size={14} fill="currentColor" /> : index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-semibold ${ativa ? "text-[#0d5c24]" : "text-[#1a1a2e]"}`}>
                      {item.titulo}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      {item.youtubeId ? <Clock3 size={12} /> : <CheckCircle2 size={12} />}
                      {item.duracao}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
