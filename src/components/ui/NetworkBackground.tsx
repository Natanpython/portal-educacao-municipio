"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function NetworkBackground() {
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

    // Configuração
    const nodeCount = 80;
    const connectionDistance = 150;
    const colors = [
      { node: "#00d4ff", line: "rgba(0, 212, 255, " },
      { node: "#8b5cf6", line: "rgba(139, 92, 246, " },
      { node: "#06b6d4", line: "rgba(6, 182, 212, " },
      { node: "#3b82f6", line: "rgba(59, 130, 246, " },
    ];

    // Criar nós
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 2 + Math.random() * 3,
        color: color.node,
      });
    }

    // Função para desenhar as conexões
    function drawConnections() {
      if (!ctx) return;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Opacidade baseada na distância
            const opacity = 0.4 * (1 - dist / connectionDistance);
            
            // Escolher cor baseada na distância
            const color1 = nodes[i].color;
            const color2 = nodes[j].color;
            
            // Gradiente entre as duas cores
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, color1 + Math.floor(opacity * 80).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, color2 + Math.floor(opacity * 80).toString(16).padStart(2, '0'));

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 + opacity * 1.5;
            ctx.shadowColor = color1;
            ctx.shadowBlur = 5;
            ctx.stroke();
          }
        }
      }
    }

    // Função para desenhar os nós
    function drawNodes() {
      if (!ctx) return;

      nodes.forEach((node) => {
        // Brilho externo
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        gradient.addColorStop(0, node.color + "40");
        gradient.addColorStop(1, node.color + "00");

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Núcleo do nó
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 15;
        ctx.fill();

        // Brilho interno
        ctx.beginPath();
        ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.shadowBlur = 0;
        ctx.fill();
      });
    }

    // Animar
    function animate() {
      if (!ctx) return;

      // Limpar com fade para efeito de rastro
      ctx.fillStyle = "rgba(10, 10, 26, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // Atualizar posições
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Rebater nas bordas
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      drawConnections();
      drawNodes();

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