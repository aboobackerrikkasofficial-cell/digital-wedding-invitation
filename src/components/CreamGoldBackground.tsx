"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
}

export function CreamGoldBackground({ bgColor = "#fffcf2", particleImage }: { bgColor?: string; particleImage?: string }) {
  const isPinkTheme = bgColor === "#FF8DA1";

  const particles = useMemo<Particle[]>(() => [...Array(25)].map((_, i) => ({
    id: i,
    size: (i * 7.13 % 8) + 4,
    left: (i * 13.17 % 100),
    duration: (i * 19.23 % 10) + 10,
    delay: (i * 37.41 % 20) - 20,
    drift: (i * 5.57 % 40) - 20,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Background base layer to ensure visibility */}
      <div className="absolute inset-0 opacity-100" style={{ backgroundColor: bgColor }} />
      
      {/* Noise Texture for Premium Feel */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
           }} 
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            y: "110vh", 
            x: `${p.left}vw`, 
            opacity: 0
          }}
          animate={{ 
            y: "-10vh",
            x: [`${p.left}vw`, `${p.left + p.drift}vw`],
            opacity: [0, isPinkTheme ? 0.6 : 0.4, 0]
          }}
          transition={{ 
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          className="absolute"
          style={{
            width: isPinkTheme ? p.size * 2.5 : p.size,
            height: isPinkTheme ? p.size * 2.5 : p.size,
            willChange: "transform"
          }}
        >
          {particleImage ? (
            <img 
              src={particleImage} 
              alt="" 
              className="w-full h-full object-contain" 
            />
          ) : (
            <div 
              className="w-full h-full rounded-full" 
              style={{ background: "#D4AF37", filter: "blur(0.5px)" }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
