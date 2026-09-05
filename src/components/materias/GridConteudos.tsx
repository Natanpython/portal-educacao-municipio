"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Clock3, FileText, Sparkles, Tag } from "lucide-react";

type Conteudo = { id: string; materiaSlug: string; titulo: string; descricao: string; data: string; tags: string[] };

export default function GridConteudos({ conteudos, cor }: { conteudos: Conteudo[]; cor: string }) {
  const reduzirMovimento = useReducedMotion();

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {conteudos.map((conteudo, index) => (
        <motion.article
          key={conteudo.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={reduzirMovimento ? undefined : { y: -6 }}
          transition={{ duration: 0.4, delay: index * 0.07 }}
          viewport={{ once: true }}
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-[0_20px_45px_rgba(26,42,31,0.11)]"
        >
          <span className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${cor}, ${cor}88, transparent)` }} />
          <span aria-hidden="true" className="absolute right-0 top-0 h-16 w-16 bg-gray-50 [clip-path:polygon(100%_0,100%_100%,0_0)] transition-colors group-hover:bg-[var(--document-light)]" style={{ "--document-light": `${cor}15` } as React.CSSProperties} />

          <div className="relative flex items-start justify-between">
            <motion.span animate={reduzirMovimento ? undefined : { y: [0, -3, 0] }} transition={{ duration: 3.4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }} className="flex h-13 w-13 items-center justify-center rounded-2xl" style={{ color: cor, backgroundColor: `${cor}12` }}>
              <FileText size={25} />
            </motion.span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-gray-300">Documento {String(index + 1).padStart(2, "0")}</span>
          </div>

          <div className="relative mt-6">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {conteudo.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium" style={{ color: cor, backgroundColor: `${cor}0f` }}><Tag size={9} />{tag}</span>
              ))}
            </div>
            <h3 className="text-xl font-bold leading-snug text-[#1a1a2e] transition-colors group-hover:text-[var(--document-color)]" style={{ "--document-color": cor } as React.CSSProperties}>{conteudo.titulo}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">{conteudo.descricao}</p>
          </div>

          <div className="relative mt-auto pt-6">
            <div className="mb-3 flex items-center gap-2 border-t border-gray-100 pt-4 text-[11px] text-gray-400"><CalendarDays size={13} /> Atualizado em {new Date(conteudo.data).toLocaleDateString("pt-BR")}</div>
            <div className="flex w-full items-center justify-between rounded-xl border border-dashed px-4 py-3" style={{ color: cor, borderColor: `${cor}35`, backgroundColor: `${cor}08` }}>
              <span className="flex items-center gap-2 text-xs font-semibold"><Clock3 size={15} /> Em preparação</span>
              <Sparkles size={13} className="opacity-50" />
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
