"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide back button on the very first landing/welcome page or login page
    const hideOn = ["/", "/admin/login"];
    setIsVisible(!hideOn.includes(pathname));
  }, [pathname]);

  if (!isVisible) return null;

  const isAdminPage = pathname.startsWith("/admin");

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        onClick={() => {
            if (window.history.length > 1) {
                router.back();
            } else {
                router.push(isAdminPage ? "/admin" : "/");
            }
        }}
        className={cn(
            "fixed z-[1000] flex items-center gap-2 px-4 py-2 bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/30 text-gray-800 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-black/5 group",
            isAdminPage ? "top-6 md:left-80 left-4" : "top-6 left-6"
        )}
        title="Go Back"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </motion.button>
    </AnimatePresence>
  );
}

// Utility to handle classes if not already present
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
