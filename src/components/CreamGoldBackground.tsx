"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CreamGoldBackground() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const p = [...Array(25)].map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 4, // 4px to 12px
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * -20,
      drift: (Math.random() - 0.5) * 40,
    }));
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fffcf2]">
      {/* Background base layer to ensure visibility */}
      <div className="absolute inset-0 bg-[#fffcf2] opacity-100" />
      
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
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: "#D4AF37",
            filter: "blur(0.5px)",
            willChange: "transform"
          }}
        />
      ))}
    </div>
  );
}
