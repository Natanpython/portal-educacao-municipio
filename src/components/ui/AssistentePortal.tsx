"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BookOpen, GraduationCap, HelpCircle, MessageCircle,
  Newspaper, RotateCcw, Send, Sparkles, UserRoundCheck, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Opcao = {
  id: string;
  titulo: string;
  descricao: string;
  resposta: string;
  destino: string;
  acao: string;
  Icone: LucideIcon;
  cor: string;
  externo?: boolean;
};

const opcoes: Opcao[] = [
  {
    id: "professor", titulo: "Acesso do Professor", descricao: "Formulário e área de envio",
    resposta: "Perfeito! Vou abrir o formulário de acesso dos professores para você.",
    destino: "https://forms.gle/a6pP6f769RD3UukZ6", acao: "Acessar formulário",
    Icone: UserRoundCheck, cor: "#1a8c3a", externo: true,
  },
  {
    id: "noticias", titulo: "Notícias", descricao: "Novidades da educação municipal",
    resposta: "Vamos conferir o que está acontecendo na nossa rede municipal de educação!",
    destino: "/#noticias", acao: "Ver notícias", Icone: Newspaper, cor: "#f5a623",
  },
  {
    id: "tutoriais", titulo: "Tutoriais", descricao: "Cursos e videoaulas",
    resposta: "Ótima escolha! Nos tutoriais você encontra cursos e aulas em vídeo.",
    destino: "/tutoriais", acao: "Explorar tutoriais", Icone: GraduationCap, cor: "#2196F3",
  },
  {
    id: "atividades", titulo: "Atividades", descricao: "Matérias e materiais didáticos",
    resposta: "Separei a área com as matérias e os materiais disponíveis para estudo.",
    destino: "/materias", acao: "Ver atividades", Icone: BookOpen, cor: "#af40ff",
  },
  {
    id: "contato", titulo: "Falar com a Secretaria", descricao: "Telefones, e-mail e endereço",
    resposta: "Claro! Na página de contato você encontra todos os canais de atendimento.",
    destino: "/contato", acao: "Abrir contato", Icone: MessageCircle, cor: "#ff5299",
  },
];

export default function AssistentePortal() {
  const [aberto, setAberto] = useState(false);
  const [selecionada, setSelecionada] = useState<Opcao | null>(null);
  const [convite, setConvite] = useState(false);

  useEffect(() => {
    const mostrar = window.setTimeout(() => setConvite(true), 1800);
    const esconder = window.setTimeout(() => setConvite(false), 8500);
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(mostrar);
      window.clearTimeout(esconder);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const alternar = () => {
    setAberto((atual) => !atual);
    setConvite(false);
  };

  const fechar = () => {
    setAberto(false);
    setSelecionada(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {aberto && (
          <motion.section
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 27, stiffness: 260 }}
            className="fixed bottom-0 right-0 flex max-h-[min(680px,calc(100vh-24px))] w-full flex-col overflow-hidden rounded-t-3xl border border-[#1a8c3a]/20 bg-white shadow-2xl shadow-black/20 sm:bottom-6 sm:right-6 sm:w-[390px] sm:rounded-3xl"
            aria-label="Assistente de ajuda do portal"
          >
            <header className="relative overflow-hidden bg-gradient-to-br from-[#0d5c24] to-[#1a8c3a] px-5 py-4 text-white">
              <div className="absolute -right-8 -top-12 h-32 w-32 rounded-full border border-white/10" />
              <div className="relative flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f5a623]/40 bg-white/10">
                  <MiniRobo />
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#0d5c24] bg-[#4ade80]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-bold">Bayeuxinho</h2>
                    <Sparkles size={13} className="text-[#f5a623]" />
                  </div>
                  <p className="text-xs text-white/65">Assistente do Portal da Educação</p>
                </div>
                <button type="button" onClick={fechar} aria-label="Fechar assistente" className="flex h-9 w-9 items-center justify-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white">
                  <X size={19} />
                </button>
              </div>
            </header>

            <div className="overflow-y-auto bg-[#f7f9f7] p-4">
              <div className="flex items-start gap-2.5">
                <Avatar />
                <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-600 shadow-sm">
                  Olá! Eu sou o <strong className="text-[#1a8c3a]">Bayeuxinho</strong>. 👋 Como posso ajudar você hoje?
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!selecionada ? (
                  <motion.div key="menu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-2">
                    <p className="px-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Escolha uma opção</p>
                    {opcoes.map((opcao) => (
                      <button key={opcao.id} type="button" onClick={() => setSelecionada(opcao)} className="group flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1a8c3a]/25 hover:shadow-md">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ color: opcao.cor, backgroundColor: `${opcao.cor}14` }}>
                          <opcao.Icone size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-[#1a1a2e]">{opcao.titulo}</span>
                          <span className="block truncate text-xs text-gray-400">{opcao.descricao}</span>
                        </span>
                        <ArrowRight size={16} className="text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-[#1a8c3a]" />
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key={selecionada.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="mt-4 space-y-3">
                    <div className="flex justify-end">
                      <div className="max-w-[82%] rounded-2xl rounded-tr-md bg-[#1a8c3a] px-4 py-2.5 text-sm text-white shadow-sm">{selecionada.titulo}</div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Avatar />
                      <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-600 shadow-sm">{selecionada.resposta}</div>
                    </div>
                    <Link href={selecionada.destino} target={selecionada.externo ? "_blank" : undefined} rel={selecionada.externo ? "noopener noreferrer" : undefined} onClick={() => setAberto(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a8c3a] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#1a8c3a]/20 hover:bg-[#0d5c24]">
                      {selecionada.acao} <Send size={15} />
                    </Link>
                    <button type="button" onClick={() => setSelecionada(null)} className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-gray-400 hover:bg-white hover:text-[#1a8c3a]">
                      <RotateCcw size={14} /> Escolher outra opção
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <footer className="flex items-center justify-center gap-1.5 border-t border-gray-100 bg-white px-4 py-2.5 text-[10px] text-gray-400">
              <HelpCircle size={11} /> Assistente de navegação — nenhuma IA utilizada
            </footer>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {convite && !aberto && (
          <motion.button type="button" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} onClick={alternar} className="absolute bottom-3 right-[76px] w-max max-w-[220px] rounded-2xl rounded-br-md border border-gray-200 bg-white px-4 py-3 text-left text-sm text-[#1a1a2e] shadow-xl">
            <span className="font-semibold">Olá! Precisa de ajuda?</span>
            <span className="mt-0.5 block text-xs text-gray-400">Posso mostrar o caminho 👋</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!aberto && (
          <motion.button
            type="button"
            onClick={alternar}
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.75 }}
            transition={{ y: { duration: 2.8, repeat: Infinity }, opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Abrir assistente de ajuda"
            aria-expanded="false"
            className="group relative flex h-[76px] w-[76px] items-center justify-center rounded-[24px] border-2 border-[#f5a623]/60 bg-gradient-to-br from-[#176f31] via-[#0d5c24] to-[#073b17] text-white shadow-xl shadow-[#0d5c24]/35"
          >
            <RoboTecnologico />
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function Avatar() {
  return <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0d5c24]"><MiniRobo /></div>;
}

function MiniRobo() {
  return (
    <span className="relative block h-5 w-6 rounded-md border border-[#f5a623] bg-[#123d20] shadow-[inset_0_0_5px_rgba(245,166,35,0.25)]">
      <span className="absolute -top-2 left-1/2 h-2 w-px -translate-x-1/2 bg-[#f5a623]" />
      <span className="absolute -top-2.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#f5a623] shadow-[0_0_5px_#f5a623]" />
      <span className="absolute left-1 top-1.5 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_4px_#4ade80]" />
      <span className="absolute right-1 top-1.5 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_4px_#4ade80]" />
      <span className="absolute bottom-1 left-1/2 h-px w-2.5 -translate-x-1/2 bg-[#f5a623]/70" />
    </span>
  );
}

function RoboTecnologico() {
  return (
    <div className="relative h-14 w-14" aria-hidden="true">
      <div className="absolute left-1/2 top-3 h-9 w-10 -translate-x-1/2 rounded-[13px] border-2 border-[#f5a623] bg-gradient-to-b from-[#164f29] to-[#092d14] shadow-[inset_0_0_10px_rgba(245,166,35,0.2),0_0_9px_rgba(245,166,35,0.2)]">
        <span className="absolute -top-3 left-1/2 h-3 w-0.5 -translate-x-1/2 bg-[#f5a623]" />
        <motion.span className="absolute -top-4 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#f5a623] shadow-[0_0_8px_#f5a623]" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <span className="absolute left-2 top-2.5 h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_7px_#4ade80]" />
        <span className="absolute right-2 top-2.5 h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_7px_#4ade80]" />
        <span className="absolute bottom-2 left-1/2 flex h-1 w-4 -translate-x-1/2 gap-0.5">
          <i className="h-full w-0.5 bg-[#f5a623]" /><i className="h-full w-0.5 bg-[#f5a623]" /><i className="h-full w-0.5 bg-[#f5a623]" />
        </span>
      </div>

      <motion.div className="absolute -right-2 top-4 h-9 w-5 origin-bottom-left" animate={{ rotate: [8, -18, 12, -18, 8] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.8 }}>
        <span className="absolute bottom-0 left-0 h-5 w-2.5 -rotate-[28deg] rounded-full border border-[#f5a623] bg-[#0d5c24]" />
        <span className="absolute left-1 top-1 h-5 w-2.5 rotate-[18deg] rounded-full border border-[#f5a623] bg-[#164f29]" />
        <span className="absolute right-0 top-0 h-2 w-2 rounded-full border border-[#f5a623] bg-[#f5a623]/30 shadow-[0_0_5px_rgba(245,166,35,0.7)]" />
        <span className="absolute -right-1 -top-2 h-3 w-1 rotate-[18deg] rounded-full bg-[#f5a623]" />
        <span className="absolute right-1 -top-3 h-3 w-1 rounded-full bg-[#f5a623]" />
        <span className="absolute right-3 -top-2 h-3 w-1 -rotate-[18deg] rounded-full bg-[#f5a623]" />
      </motion.div>

      <span className="absolute bottom-0 left-1/2 h-1.5 w-7 -translate-x-1/2 rounded-full bg-[#f5a623]/70 shadow-[0_0_7px_rgba(245,166,35,0.4)]" />
    </div>
  );
}
