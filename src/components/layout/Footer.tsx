import { Heart, Mail, MapPin, Phone, Globe, Share2, Link2, BookOpen, Sparkles, Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#0d5c24] border-t border-[#f5a623]/20 overflow-hidden">
      {/* LINHA SUPERIOR LARANJA */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent"></div>
      
      {/* DETALHES DE CANTO LARANJA */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#f5a623]/20"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-[#f5a623]/20"></div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Coluna 1 - Identidade do município */}
          <div className="flex items-start justify-start">
            <Link
              href="/"
              aria-label="Ir para a página inicial"
              className="group relative block h-48 w-full max-w-[230px] transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src="/images/logo-principal-footer.png"
                alt="Prefeitura de Bayeux - Secretaria Municipal de Educação"
                fill
                sizes="230px"
                className="object-contain drop-shadow-[0_5px_8px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#f5a623] rounded-full"></span>
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#f5a623] group-hover:w-4 transition-all duration-300"></span>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/materias" className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#f5a623] group-hover:w-4 transition-all duration-300"></span>
                  Matérias
                </Link>
              </li>
              <li>
                <Link href="/tutoriais" className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#f5a623] group-hover:w-4 transition-all duration-300"></span>
                  Tutoriais
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#f5a623] group-hover:w-4 transition-all duration-300"></span>
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Apresentação */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f5a623]/20 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f5a623]">
              <BookOpen size={14} />
              Educação municipal
            </div>

            <p className="text-white/70 text-sm max-w-xs leading-relaxed">
              Materiais didáticos inovadores produzidos pelos professores da rede municipal.
            </p>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#f5a623] font-mono">SECRETARIA</span>
              <span className="w-px h-3 bg-[#f5a623]/30"></span>
              <span className="text-white/40 font-mono">v2.0.0</span>
              <span className="w-px h-3 bg-[#f5a623]/30"></span>
              <Bot size={12} className="text-[#f5a623]" />
            </div>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#f5a623] rounded-full"></span>
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-sm group">
                <MapPin size={16} className="text-[#f5a623] mt-0.5 flex-shrink-0 group-hover:text-[#f5a623] transition-colors" />
                <span>Secretaria Municipal de Educação</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm group">
                <Mail size={16} className="text-[#f5a623] mt-0.5 flex-shrink-0 group-hover:text-[#f5a623] transition-colors" />
                <span>contato@educacao.municipio.br</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm group">
                <Phone size={16} className="text-[#f5a623] mt-0.5 flex-shrink-0 group-hover:text-[#f5a623] transition-colors" />
                <span>(44) 1234-5678</span>
              </li>
            </ul>
            
            {/* Redes sociais com borda laranja */}
            <div className="flex gap-3 mt-6">
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl border border-[#f5a623]/30 hover:border-[#f5a623] bg-[#f5a623]/5 hover:bg-[#f5a623]/10 flex items-center justify-center transition-all group"
              >
                <Globe size={18} className="text-white/50 group-hover:text-[#f5a623] transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl border border-[#f5a623]/30 hover:border-[#f5a623] bg-[#f5a623]/5 hover:bg-[#f5a623]/10 flex items-center justify-center transition-all group"
              >
                <Share2 size={18} className="text-white/50 group-hover:text-[#f5a623] transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl border border-[#f5a623]/30 hover:border-[#f5a623] bg-[#f5a623]/5 hover:bg-[#f5a623]/10 flex items-center justify-center transition-all group"
              >
                <Link2 size={18} className="text-white/50 group-hover:text-[#f5a623] transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* DIVISÓRIA COM DETALHE LARANJA */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#f5a623]/30 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-[#0d5c24]">
              <div className="flex items-center gap-2 text-[#f5a623]/40">
                <BookOpen size={14} />
                <span className="text-xs font-mono text-[#f5a623]/60">{"// SECRETARIA DE EDUCAÇÃO"}</span>
                <Sparkles size={12} className="text-[#f5a623]/40" />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER INFERIOR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/40 flex items-center gap-2">
            © 2026 Secretaria Municipal de Educação. Todos os direitos reservados.
            <span className="hidden md:inline w-px h-4 bg-[#f5a623]/30"></span>
            <span className="text-[#f5a623]/40 text-xs font-mono hidden md:inline">v2.0.0</span>
          </p>
          
          <p className="text-white/40 flex items-center gap-1 group">
            Feito com 
            <Heart size={14} className="text-[#f5a623]/50 group-hover:text-[#f5a623] transition-colors mx-1 animate-pulse" />
            pela equipe de educação
            <span className="ml-2 text-[#f5a623]/30 text-xs font-mono group-hover:text-[#f5a623] transition-colors">
              &lt;tecnologia /&gt;
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
