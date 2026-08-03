"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TechIconProps {
  icon: LucideIcon;
  color?: string;
  size?: number;
  animated?: boolean;
  className?: string;
}

export default function TechIcon({ 
  icon: Icon, 
  color = "#00d4ff", 
  size = 32, 
  animated = true,
  className = ""
}: TechIconProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Círculo de fundo com efeito de anel */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${color}20`,
          background: `radial-gradient(circle at 30% 30%, ${color}10, transparent 70%)`,
        }}
      />
      
      {/* Anel externo pulsante */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${color}30` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      {/* Ícone propriamente dito */}
      <motion.div
        className="relative"
        animate={animated ? { 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        <Icon size={size} strokeWidth={1.5} style={{ color }} />
      </motion.div>
    </div>
  );
}