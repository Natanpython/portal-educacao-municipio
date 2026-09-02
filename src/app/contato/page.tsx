import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import contato from "@/data/contato.json";

export const metadata: Metadata = {
  title: "Contato | EduPortal",
  description: "Canais de atendimento da Secretaria Municipal de Educação.",
};

const canais = [
  {
    titulo: "Telefone",
    valor: contato.telefone,
    descricao: "Atendimento durante o horário de expediente.",
    href: `tel:${contato.telefoneLink}`,
    acao: "Ligar agora",
    Icone: Phone,
    cor: "#1a8c3a",
  },
  {
    titulo: "E-mail",
    valor: contato.email,
    descricao: "Envie sua solicitação e responderemos assim que possível.",
    href: `mailto:${contato.email}`,
    acao: "Enviar e-mail",
    Icone: Mail,
    cor: "#2196F3",
  },
  {
    titulo: "WhatsApp",
    valor: contato.whatsapp,
    descricao: "Canal rápido para informações e orientações.",
    href: `https://wa.me/${contato.whatsappLink}`,
    acao: "Iniciar conversa",
    Icone: MessageCircle,
    cor: "#f5a623",
  },
];

export default function ContatoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f9fa]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-20 h-[460px] w-[460px] rounded-full bg-[#1a8c3a]/5 blur-3xl" />
        <div className="absolute -left-32 top-[620px] h-96 w-96 rounded-full bg-[#f5a623]/5 blur-3xl" />
      </div>

      <section className="relative border-b border-[#1a8c3a]/10 bg-gradient-to-br from-white via-[#f8fbf8] to-[#e8f5e9]">
        <div className="container mx-auto grid items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1fr_420px]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1a8c3a]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#1a8c3a] shadow-sm">
              <Building2 size={16} />
              Fale com a Secretaria
              <Sparkles size={14} className="text-[#f5a623]" />
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-[#1a1a2e] md:text-5xl">
              Estamos aqui para <span className="text-gradient-institutional">ajudar você</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              {contato.descricao} Escolha abaixo o canal de atendimento mais adequado para falar conosco.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${contato.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1a8c3a] px-5 py-3 font-semibold text-white shadow-lg shadow-[#1a8c3a]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0d5c24] hover:shadow-xl"
              >
                <Mail size={18} /> Enviar mensagem
              </a>
              <a
                href={`tel:${contato.telefoneLink}`}
                className="inline-flex items-center gap-2 rounded-xl border border-[#1a8c3a]/25 bg-white px-5 py-3 font-semibold text-[#1a8c3a] shadow-sm transition-all hover:border-[#1a8c3a]/50 hover:bg-[#e8f5e9]"
              >
                <Phone size={18} /> {contato.telefone}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-[#1a8c3a]/15 to-[#f5a623]/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-2xl shadow-[#0d5c24]/10">
              <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#1a8c3a] via-[#f5a623] to-[#1a8c3a]" />
              <div className="relative mx-auto aspect-square max-w-[280px]">
                <Image
                  src="/images/logo-principal.png"
                  alt={`Logo oficial - ${contato.instituicao}`}
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-3 border-t border-gray-100 pt-5 text-center">
                <p className="font-bold text-[#1a1a2e]">{contato.instituicao}</p>
                <p className="mt-1 text-sm text-gray-500">{contato.municipio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 py-14 md:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#1a8c3a]">Canais de atendimento</span>
          <h2 className="mt-2 text-3xl font-bold text-[#1a1a2e]">Como podemos conversar?</h2>
          <p className="mt-3 text-gray-500">Utilize o canal que for mais conveniente para você.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {canais.map(({ titulo, valor, descricao, href, acao, Icone, cor }) => (
            <a
              key={titulo}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1a8c3a]/25 hover:shadow-xl"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ color: cor, backgroundColor: `${cor}14` }}
              >
                <Icone size={24} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#1a1a2e]">{titulo}</h3>
              <p className="mt-1 break-words font-semibold" style={{ color: cor }}>{valor}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">{descricao}</p>
              <span className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm font-semibold text-[#1a8c3a]">
                {acao}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="p-7 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f5e9] text-[#1a8c3a]">
              <MapPin size={24} />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-[#1a1a2e]">Atendimento presencial</h2>
            <p className="mt-3 leading-relaxed text-gray-500">{contato.endereco}</p>
            <p className="mt-1 font-semibold text-[#1a8c3a]">{contato.cidade}</p>

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-[#f5a623]/20 bg-[#fff3e0] p-4">
              <Clock3 size={20} className="mt-0.5 shrink-0 text-[#f5a623]" />
              <div>
                {contato.horarios.map((horario) => (
                  <div key={horario.dias}>
                    <p className="text-sm font-semibold text-[#1a1a2e]">{horario.dias}</p>
                    <p className="mt-1 text-sm text-gray-600">{horario.periodo}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-[#0d5c24] p-8 text-center text-white">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full border border-white" />
              <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full border border-white" />
            </div>
            <div className="relative max-w-sm">
              <ShieldCheck size={48} className="mx-auto text-[#f5a623]" />
              <h3 className="mt-5 text-2xl font-bold">Atendimento à comunidade</h3>
              <p className="mt-3 leading-relaxed text-white/70">
                Nosso compromisso é oferecer informações claras e aproximar a Secretaria de toda a comunidade escolar.
              </p>
              <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f5a623] hover:text-white">
                Conhecer o portal <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">{contato.observacao}</p>
      </section>
    </div>
  );
}
