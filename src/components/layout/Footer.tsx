import { GraduationCap, Heart, Mail, MapPin, Phone, Globe, Share2, Link2, BookOpen, Sparkles, Bot } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#f5f5f5] border-t border-[#1a8c3a]/20 overflow-hidden">
      {/* Linha superior verde */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1a8c3a] to-transparent"></div>
      
      {/* Detalhes decorativos */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#1a8c3a]/10"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-[#1a8c3a]/10"></div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Coluna 1 - Logo e descrição */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#1a8c3a]/20 blur-xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <GraduationCap size={28} className="text-[#1a8c3a] relative z-10 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">
                Edu<span className="text-[#1a8c3a]">Portal</span>
              </span>
            </Link>
            
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Materiais didáticos inovadores produzidos pelos professores da rede municipal.
            </p>
            
            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#1a8c3a] font-mono">SECRETARIA</span>
              <span className="w-px h-3 bg-[#1a8c3a]/20"></span>
              <span className="text-[#f5a623] font-mono">v2.0.0</span>
              <span className="w-px h-3 bg-[#1a8c3a]/20"></span>
              <Bot size={12} className="text-[#1a8c3a]" />
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h4 className="text-[#1a1a2e] font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#1a8c3a] rounded-full"></span>
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-500 hover:text-[#1a8c3a] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#1a8c3a] group-hover:w-4 transition-all duration-300"></span>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/materias" className="text-gray-500 hover:text-[#f5a623] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#f5a623] group-hover:w-4 transition-all duration-300"></span>
                  Matérias
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-500 hover:text-[#1a8c3a] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#1a8c3a] group-hover:w-4 transition-all duration-300"></span>
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-500 hover:text-[#1a8c3a] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#1a8c3a] group-hover:w-4 transition-all duration-300"></span>
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Matérias */}
          <div>
            <h4 className="text-[#1a1a2e] font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#1a8c3a] rounded-full"></span>
              Matérias
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/conteudos?materia=portugues" className="text-gray-500 hover:text-[#1a8c3a] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#1a8c3a] group-hover:w-4 transition-all duration-300"></span>
                  Português
                </Link>
              </li>
              <li>
                <Link href="/conteudos?materia=matematica" className="text-gray-500 hover:text-[#f5a623] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#f5a623] group-hover:w-4 transition-all duration-300"></span>
                  Matemática
                </Link>
              </li>
              <li>
                <Link href="/conteudos?materia=ciencias" className="text-gray-500 hover:text-[#2196F3] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#2196F3] group-hover:w-4 transition-all duration-300"></span>
                  Ciências
                </Link>
              </li>
              <li>
                <Link href="/conteudos?materia=historia" className="text-gray-500 hover:text-[#ff5299] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#ff5299] group-hover:w-4 transition-all duration-300"></span>
                  História
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h4 className="text-[#1a1a2e] font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#1a8c3a] rounded-full"></span>
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 text-sm group">
                <MapPin size={16} className="text-[#1a8c3a] mt-0.5 flex-shrink-0 group-hover:text-[#f5a623] transition-colors" />
                <span>Secretaria Municipal de Educação</span>
              </li>
              <li className="flex items-start gap-3 text-gray-500 text-sm group">
                <Mail size={16} className="text-[#1a8c3a] mt-0.5 flex-shrink-0 group-hover:text-[#f5a623] transition-colors" />
                <span>contato@educacao.municipio.br</span>
              </li>
              <li className="flex items-start gap-3 text-gray-500 text-sm group">
                <Phone size={16} className="text-[#1a8c3a] mt-0.5 flex-shrink-0 group-hover:text-[#f5a623] transition-colors" />
                <span>(44) 1234-5678</span>
              </li>
            </ul>
            
            {/* Redes sociais */}
            <div className="flex gap-3 mt-6">
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl border border-[#1a8c3a]/20 hover:border-[#1a8c3a] bg-white hover:bg-[#e8f5e9] flex items-center justify-center transition-all group"
              >
                <Globe size={18} className="text-gray-400 group-hover:text-[#1a8c3a] transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl border border-[#f5a623]/20 hover:border-[#f5a623] bg-white hover:bg-[#fff3e0] flex items-center justify-center transition-all group"
              >
                <Share2 size={18} className="text-gray-400 group-hover:text-[#f5a623] transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl border border-[#ff5299]/20 hover:border-[#ff5299] bg-white hover:bg-[#fce4ec] flex items-center justify-center transition-all group"
              >
                <Link2 size={18} className="text-gray-400 group-hover:text-[#ff5299] transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Divisória */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a8c3a]/20 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-[#f5f5f5]">
              <div className="flex items-center gap-2 text-[#1a8c3a]/40">
                <BookOpen size={14} />
                <span className="text-xs font-mono text-[#1a8c3a]/60">// SECRETARIA DE EDUCAÇÃO</span>
                <Sparkles size={12} className="text-[#f5a623]/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400 flex items-center gap-2">
            © 2026 EduPortal. Todos os direitos reservados.
            <span className="hidden md:inline w-px h-4 bg-[#1a8c3a]/20"></span>
            <span className="text-[#1a8c3a]/40 text-xs font-mono hidden md:inline">v2.0.0</span>
          </p>
          
          <p className="text-gray-400 flex items-center gap-1 group">
            Feito com 
            <Heart size={14} className="text-[#ff5299]/50 group-hover:text-[#ff5299] transition-colors mx-1 animate-pulse" />
            pela equipe de educação
            <span className="ml-2 text-[#1a8c3a]/30 text-xs font-mono group-hover:text-[#1a8c3a] transition-colors">
              &lt;tecnologia /&gt;
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}