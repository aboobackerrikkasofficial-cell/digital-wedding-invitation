"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function TrustMessage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full py-4 px-6 flex flex-col items-center justify-center text-center bg-transparent pointer-events-none z-[100]"
    >
      <div className="flex flex-col items-center gap-1">
        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-gold/60">
          Official Digital Wedding Invitation
        </p>
        <h2 className="text-[12px] md:text-[14px] font-serif font-bold text-white tracking-widest uppercase drop-shadow-sm">
          Fathimath Ayisha Thasneem & Muhammed Thameem MD
        </h2>
        <div className="flex items-center gap-1.5 mt-0.5">
          <ShieldCheck size={12} className="text-gold" />
          <p className="text-[9px] md:text-[10px] font-bold text-gold uppercase tracking-[0.2em]">
            Secure Invitation Link
          </p>
        </div>
      </div>
      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-3" />
    </motion.div>
  );
}
