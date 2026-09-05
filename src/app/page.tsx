import Hero from "@/components/home/Hero";
import GaleriaOficinas from "@/components/home/GaleriaOficinas";
import SobreEducacao from "@/components/home/SobreEducacao";
import CarrosselNoticias from "@/components/home/CarrosselNoticias";
import ScrollReveal from "@/components/ui/ScrollReveal";
import noticiasData from "@/data/noticias.json";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollReveal direction="left">
        <SobreEducacao />
      </ScrollReveal>
      
      {/* Seção de Notícias */}
      <ScrollReveal direction="right">
        <section id="noticias" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#1a8c3a] font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                📰
                Notícias
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mt-2">
                Últimas <span className="text-[#1a8c3a]">notícias</span> da educação
              </h2>
              <p className="text-gray-500 mt-4">
                Fique por dentro dos eventos, formações e projetos da rede municipal
              </p>
            </div>

            <CarrosselNoticias noticias={noticiasData.noticias} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="up">
        <GaleriaOficinas />
      </ScrollReveal>
    </>
  );
}
