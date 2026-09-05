"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface Path {
  points: Point[];
  color: string;
  speed: number;
  offset: number;
}

export default function CircuitBackground() {
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

    const paths: Path[] = [];
    const numPaths = 25;

    // Cores vibrantes para os traços
    const colors = [
      "#00ccff", "#0088ff", "#00aaff", 
      "#0066ff", "#00ddff", "#0099ff"
    ];

    function createCircuitPath(startX: number, startY: number): Path {
      const points: Point[] = [{ x: startX, y: startY }];
      let currentX = startX;
      let currentY = startY;
      const steps = 4 + Math.floor(Math.random() * 6);
      const stepSize = 60 + Math.random() * 100;

      for (let i = 0; i < steps; i++) {
        if (Math.random() > 0.5) {
          currentX += (Math.random() > 0.5 ? 1 : -1) * stepSize;
        } else {
          currentY += (Math.random() > 0.5 ? 1 : -1) * stepSize;
        }
        currentX = Math.max(30, Math.min(width - 30, currentX));
        currentY = Math.max(30, Math.min(height - 30, currentY));
        points.push({ x: currentX, y: currentY });
      }

      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        points,
        color,
        speed: 0.005 + Math.random() * 0.015,
        offset: 0,
      };
    }

    for (let i = 0; i < numPaths; i++) {
      const x = 30 + Math.random() * (width - 60);
      const y = 30 + Math.random() * (height - 60);
      paths.push(createCircuitPath(x, y));
    }

    function drawPads() {
      if (!ctx) return;

      paths.forEach((path) => {
        path.points.forEach((point) => {
          // Anel externo - glow
          ctx.beginPath();
          ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = path.color + "15";
          ctx.shadowColor = path.color;
          ctx.shadowBlur = 20;
          ctx.fill();

          // Anel interno
          ctx.beginPath();
          ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = path.color + "60";
          ctx.shadowColor = path.color;
          ctx.shadowBlur = 30;
          ctx.fill();

          // Centro - ponto branco
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 15;
          ctx.fill();

          // Traços saindo do pad
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const dx = Math.cos(angle) * 8;
            const dy = Math.sin(angle) * 8;
            ctx.beginPath();
            ctx.moveTo(point.x + dx, point.y + dy);
            ctx.lineTo(point.x + dx * 0.4, point.y + dy * 0.4);
            ctx.strokeStyle = path.color + "30";
            ctx.lineWidth = 1;
            ctx.shadowBlur = 5;
            ctx.stroke();
          }
        });
      });
    }

    function drawPaths() {
      if (!ctx) return;

      paths.forEach((path) => {
        const { points, color, offset } = path;
        const totalLength = points.length;

        // TRILHA PRINCIPAL
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < totalLength; i++) {
          const curr = points[i];
          ctx.lineTo(curr.x, curr.y);
        }
        ctx.strokeStyle = color + "50";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.stroke();

        // SEGUNDA CAMADA - brilho
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < totalLength; i++) {
          const curr = points[i];
          ctx.lineTo(curr.x, curr.y);
        }
        ctx.strokeStyle = color + "20";
        ctx.lineWidth = 6;
        ctx.shadowColor = color;
        ctx.shadowBlur = 40;
        ctx.stroke();

        // EFEITO DE CORRENTE
        const progress = (offset % 1);
        const index = Math.floor(progress * (totalLength - 1));
        const nextIndex = Math.min(index + 1, totalLength - 1);
        const localProgress = (progress * (totalLength - 1)) - index;

        if (index < totalLength - 1) {
          const p1 = points[index];
          const p2 = points[nextIndex];
          const x = p1.x + (p2.x - p1.x) * localProgress;
          const y = p1.y + (p2.y - p1.y) * localProgress;

          // Glow da corrente
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
          gradient.addColorStop(0, color + "80");
          gradient.addColorStop(0.3, color + "40");
          gradient.addColorStop(1, color + "00");

          ctx.beginPath();
          ctx.arc(x, y, 20, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.shadowColor = color;
          ctx.shadowBlur = 50;
          ctx.fill();

          // Núcleo da corrente (branco)
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 30;
          ctx.fill();

          // Segundo núcleo (cor)
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = color + "60";
          ctx.shadowColor = color;
          ctx.shadowBlur = 40;
          ctx.fill();
        }
      });
    }

    function drawExtraDetails() {
      if (!ctx) return;

      // Chips (componentes)
      for (let i = 0; i < 5; i++) {
        const x = 30 + Math.random() * (width - 60);
        const y = 30 + Math.random() * (height - 60);
        const w = 15 + Math.random() * 25;
        const h = 15 + Math.random() * 25;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0, 150, 255, 0.1)";
        ctx.strokeStyle = "rgba(0, 150, 255, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, w, h);

        // Pinos do chip
        for (let side = 0; side < 4; side++) {
          const numPins = 2 + Math.floor(Math.random() * 3);
          for (let p = 0; p < numPins; p++) {
            const pos = (p + 0.5) / numPins;
            let px: number, py: number, dx: number, dy: number;
            if (side === 0) {
              px = x + w * pos; py = y; dx = 0; dy = -6;
            } else if (side === 1) {
              px = x + w; py = y + h * pos; dx = 6; dy = 0;
            } else if (side === 2) {
              px = x + w * pos; py = y + h; dx = 0; dy = 6;
            } else {
              px = x; py = y + h * pos; dx = -6; dy = 0;
            }
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + dx, py + dy);
            ctx.strokeStyle = "rgba(0, 150, 255, 0.1)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    let animationId: number;

    function animate() {
      if (!ctx) return;

      // FUNDO PRETO ABSOLUTO
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      paths.forEach((path) => {
        path.offset += path.speed;
        if (path.offset > 1) path.offset -= 1;
      });

      drawPaths();
      drawPads();
      drawExtraDetails();

      animationId = requestAnimationFrame(animate);
    }

    animate();

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
