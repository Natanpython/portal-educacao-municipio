"use client";

import { useEffect, useRef } from "react";

interface Column {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
}

export default function MatrixRain() {
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

    // Caracteres para a chuva Matrix
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");

    // Configurações
    const fontSize = 18;
    const columnWidth = fontSize + 4;
    const columnsCount = Math.ceil(width / columnWidth);

    // Criar colunas
    const columns: Column[] = [];
    for (let i = 0; i < columnsCount; i++) {
      columns.push({
        x: i * columnWidth + Math.random() * 10,
        y: Math.random() * height * -1,
        speed: 2 + Math.random() * 4,
        length: 10 + Math.floor(Math.random() * 30),
        chars: [],
      });
    }

    // Pré-carregar caracteres para cada coluna
    columns.forEach((col) => {
      for (let i = 0; i < col.length; i++) {
        col.chars.push(charArray[Math.floor(Math.random() * charArray.length)]);
      }
    });

    // Função para desenhar a chuva
    function drawRain() {
      if (!ctx) return;

      // Fundo com fade (efeito de rastro)
      ctx.fillStyle = "rgba(10, 10, 26, 0.05)";
      ctx.fillRect(0, 0, width, height);

      columns.forEach((col) => {
        // Atualizar posição
        col.y += col.speed;

        // Resetar quando sair da tela
        if (col.y > height) {
          col.y = -col.length * fontSize;
          col.speed = 2 + Math.random() * 4;
          col.length = 10 + Math.floor(Math.random() * 30);
          col.chars = [];
          for (let i = 0; i < col.length; i++) {
            col.chars.push(charArray[Math.floor(Math.random() * charArray.length)]);
          }
        }

        // Desenhar cada caractere da coluna
        for (let i = 0; i < col.length; i++) {
          const yPos = col.y - i * fontSize;
          if (yPos < 0 || yPos > height) continue;

          // Tamanho da fonte
          ctx.font = `${fontSize}px "Courier New", monospace`;

          // Brilho e cor (gradiente do topo para baixo)
          const brightness = 1 - (i / col.length);
          const alpha = 0.3 + (i / col.length) * 0.7;

          // Primeiro caractere (topo) é mais brilhante
          if (i === 0) {
            ctx.fillStyle = `rgba(0, 212, 255, ${0.9 + Math.random() * 0.1})`;
            ctx.shadowColor = "#00d4ff";
            ctx.shadowBlur = 20;
          } else if (i < 3) {
            ctx.fillStyle = `rgba(0, 212, 255, ${0.7 * alpha})`;
            ctx.shadowColor = "#00d4ff";
            ctx.shadowBlur = 10;
          } else {
            const color = 150 + Math.floor(80 * brightness);
            ctx.fillStyle = `rgba(${color}, ${color + 50}, 255, ${0.4 * alpha})`;
            ctx.shadowColor = "#00d4ff";
            ctx.shadowBlur = 5;
          }

          // Desenhar caractere
          ctx.textAlign = "center";
          ctx.fillText(col.chars[i % col.chars.length], col.x, yPos);
        }
      });

      // Pequenos pontos de luz (estilo Matrix)
      if (Math.random() > 0.97) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.beginPath();
        ctx.arc(x, y, 1 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.3)";
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 15;
        ctx.fill();
      }

      requestAnimationFrame(drawRain);
    }

    drawRain();

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