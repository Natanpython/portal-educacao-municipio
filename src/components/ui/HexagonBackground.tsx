"use client";

import { useEffect, useRef } from "react";

interface Hexagon {
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  color: string;
  opacity: number;
  pulse: number;
}

export default function HexagonBackground() {
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

    // Cores baseadas na referência (tons de azul/ciano/roxo)
    const colors = [
      { base: "#00d4ff", glow: "rgba(0, 212, 255, 0.3)" },
      { base: "#0ea5e9", glow: "rgba(14, 165, 233, 0.25)" },
      { base: "#8b5cf6", glow: "rgba(139, 92, 246, 0.2)" },
      { base: "#06b6d4", glow: "rgba(6, 182, 212, 0.2)" },
      { base: "#3b82f6", glow: "rgba(59, 130, 246, 0.15)" },
    ];

    const hexagons: Hexagon[] = [];

    // Criar hexágonos em uma grade mais organizada
    const spacing = 120;
    const cols = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / spacing) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = (row % 2) * (spacing / 2);
        const x = col * spacing + offsetX;
        const y = row * spacing * 0.85;

        const color = colors[Math.floor(Math.random() * colors.length)];
        hexagons.push({
          x: x,
          y: y,
          size: 30 + Math.random() * 35,
          rotation: Math.random() * 0.2 - 0.1,
          speed: (Math.random() - 0.5) * 0.002,
          color: color.base,
          opacity: 0.3 + Math.random() * 0.4,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    // Função para desenhar um hexágono com gradiente
    function drawHexagon(hex: Hexagon, time: number) {
      if (!ctx) return;

      const { x, y, size, rotation, color, pulse } = hex;

      // Efeito pulsante
      const pulseFactor = 0.8 + 0.2 * Math.sin(time * 0.001 + pulse);
      const currentSize = size * pulseFactor;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Criar gradiente radial para o brilho interno
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
      gradient.addColorStop(0, color + "80"); // Centro mais opaco
      gradient.addColorStop(0.5, color + "40"); // Meio
      gradient.addColorStop(1, color + "10"); // Borda mais transparente

      // Desenhar o hexágono
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(angle) * currentSize;
        const py = Math.sin(angle) * currentSize;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Preencher com gradiente
      ctx.fillStyle = gradient;
      ctx.fill();

      // Borda com brilho
      ctx.strokeStyle = color + "60";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Brilho externo (glow)
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.strokeStyle = color + "20";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Pontos nos vértices com brilho
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(angle) * currentSize;
        const py = Math.sin(angle) * currentSize;

        ctx.beginPath();
        ctx.arc(px, py, 2.5 * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = color + "80";
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
      }

      ctx.restore();
    }

    // Função para desenhar conexões entre hexágonos próximos
    function drawConnections(hexagons: Hexagon[], time: number) {
      if (!ctx) return;

      // Criar pares de conexão
      for (let i = 0; i < hexagons.length; i++) {
        for (let j = i + 1; j < hexagons.length; j++) {
          const dx = hexagons[i].x - hexagons[j].x;
          const dy = hexagons[i].y - hexagons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Conectar apenas se estiverem próximos
          if (dist < 130) {
            const opacity = 0.15 * (1 - dist / 130);
            const pulse = 0.5 + 0.5 * Math.sin(time * 0.0005 + i + j);

            ctx.beginPath();
            ctx.moveTo(hexagons[i].x, hexagons[i].y);
            ctx.lineTo(hexagons[j].x, hexagons[j].y);

            const color = hexagons[i].color;
            ctx.strokeStyle = color + Math.floor(opacity * pulse * 60).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.5 + pulse * 0.5;
            ctx.shadowColor = color;
            ctx.shadowBlur = 5;
            ctx.stroke();
          }
        }
      }
    }

    // Animação principal
    let animationId: number;

    function animate(time: number) {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      // Desenhar conexões primeiro (ficam atrás)
      drawConnections(hexagons, time);

      // Desenhar hexágonos
      hexagons.forEach((hex) => {
        // Movimento lento de flutuação
        hex.x += Math.sin(time * 0.0003 + hex.pulse) * 0.05;
        hex.y += Math.cos(time * 0.0004 + hex.pulse * 1.5) * 0.05;
        hex.rotation += hex.speed;

        drawHexagon(hex, time);
      });

      animationId = requestAnimationFrame(animate);
    }

    animate(0);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
