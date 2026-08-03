"use client";

import { motion } from "framer-motion";
import { Camera, Bot, Cpu, Code2, BookOpen, Palette, Sparkles } from "lucide-react";

const oficinas = [
  { id: 1, titulo: "Oficina de Robótica", cor: "#1a8c3a", icone: Bot },
  { id: 2, titulo: "Laboratório de Tecnologia", cor: "#f5a623", icone: Cpu },
  { id: 3, titulo: "Aula de Programação", cor: "#1a8c3a", icone: Code2 },
  { id: 4, titulo: "Oficina de Leitura", cor: "#1a8c3a", icone: BookOpen },
  { id: 5, titulo: "Robótica Educacional", cor: "#1a8c3a", icone: Sparkles },
  { id: 6, titulo: "Artes e Tecnologia", cor: "#f5a623", icone: Palette },
];

export default function GaleriaOficinas() {
  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-[#1a8c3a] font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2">
            <Camera size={16} />
            Galeria de Oficinas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mt-2">
            Nossas <span className="text-[#1a8c3a]">oficinas</span> tecnológicas
          </h2>
          <p className="text-gray-500 mt-4">
            Momentos especiais de aprendizado com tecnologia e robótica
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oficinas.map((oficina, index) => (
            <motion.div
              key={oficina.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-200 hover:border-[#1a8c3a]/30 transition-all"
            >
              <div className="h-64 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 border border-[#1a8c3a]/20 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 border border-[#1a8c3a]/10 rounded-full"></div>
                </div>
                <oficina.icone size={56} className="text-[#1a8c3a]/60" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold">{oficina.titulo}</h3>
                  <p className="text-[#1a8c3a]/80 text-sm mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-[#1a8c3a] rounded-full"></span>
                    Tecnologia e inovação
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}