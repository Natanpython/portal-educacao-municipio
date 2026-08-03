"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Polygon {
  x: number;
  y: number;
  size: number;
  sides: number; // 5 = pentágono, 6 = hexágono
  rotation: number;
  speed: number;
  color: string;
  opacity: number;
}

export default function PolygonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const colors = [
      "rgba(0, 212, 255, 0.15)",
      "rgba(124, 58, 237, 0.12)",
      "rgba(6, 182, 212, 0.10)",
      "rgba(139, 92, 246, 0.08)",
      "rgba(0, 212, 255, 0.05)",
    ];

    const polygons: Polygon[] = [];

    // Criar polígonos
    for (let i = 0; i < 45; i++) {
      const sides = Math.random() > 0.5 ? 5 : 6; // Pentágono ou Hexágono
      polygons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 60,
        sides: sides,
        rotation: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.3 + Math.random() * 0.5,
      });
    }

    // Função para desenhar um polígono
    function drawPolygon(polygon: Polygon) {
      if (!ctx) return;
      
      const { x, y, size, sides, rotation, color, opacity } = polygon;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Desenhar o polígono
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Preencher com gradiente
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, color.replace("0.15", "0.3").replace("0.12", "0.25").replace("0.10", "0.2").replace("0.08", "0.15").replace("0.05", "0.1"));
      gradient.addColorStop(1, color);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Borda com brilho
      ctx.strokeStyle = color.replace("0.15", "0.6").replace("0.12", "0.5").replace("0.10", "0.4").replace("0.08", "0.3").replace("0.05", "0.2");
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pontos nos vértices
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = color.replace("0.15", "0.8").replace("0.12", "0.7").replace("0.10", "0.6").replace("0.08", "0.5").replace("0.05", "0.4");
        ctx.fill();
      }

      ctx.restore();
    }

    // Função para desenhar linhas de conexão entre polígonos próximos
    function drawConnections() {
      if (!ctx) return;
      
      for (let i = 0; i < polygons.length; i++) {
        for (let j = i + 1; j < polygons.length; j++) {
          const dx = polygons[i].x - polygons[j].x;
          const dy = polygons[i].y - polygons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            ctx.beginPath();
            const opacity = 0.08 * (1 - dist / 180);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(polygons[i].x, polygons[i].y);
            ctx.lineTo(polygons[j].x, polygons[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animação
    function animate() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);

      // Atualizar e desenhar polígonos
      polygons.forEach((polygon) => {
        polygon.rotation += polygon.speed;
        polygon.x += Math.sin(polygon.rotation * 2) * 0.1;
        polygon.y += Math.cos(polygon.rotation * 1.5) * 0.1;

        // Manter dentro da tela
        if (polygon.x < -50) polygon.x = width + 50;
        if (polygon.x > width + 50) polygon.x = -50;
        if (polygon.y < -50) polygon.y = height + 50;
        if (polygon.y > height + 50) polygon.y = -50;

        drawPolygon(polygon);
      });

      drawConnections();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}