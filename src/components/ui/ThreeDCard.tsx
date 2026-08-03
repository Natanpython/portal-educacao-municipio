"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ThreeDCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative transition-all duration-200 ${className}`}
      style={{
        transform: isHovering ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : "perspective(1000px) rotateX(0) rotateY(0)",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setRotateX(0);
        setRotateY(0);
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Brilho que acompanha o mouse */}
      {isHovering && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(0, 212, 255, 0.15), transparent 60%)`,
            zIndex: 10,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}