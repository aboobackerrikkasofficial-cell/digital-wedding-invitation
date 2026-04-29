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
    // Hide back button on landing pages
    const hideOn = ["/", "/admin/login"];
    setIsVisible(!hideOn.includes(pathname));
  }, [pathname]);

  if (!isVisible) return null;

  const isAdminPage = pathname.startsWith("/admin");

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={() => {
            // Priority 1: Use router back
            router.back();
            
            // Priority 2: Fallback if no history (direct link)
            // We wait a tiny bit to see if pathname changed
            setTimeout(() => {
                if (window.location.pathname === pathname) {
                    router.push(isAdminPage ? "/admin" : "/");
                }
            }, 100);
        }}
        className={cn(
            "fixed z-[2000] flex items-center justify-center w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-xl border border-gray-200 text-gray-900 rounded-full shadow-lg transition-all active:scale-90 group",
            isAdminPage 
              ? "top-4 md:left-[300px] left-4" 
              : "top-4 left-4"
        )}
        title="Go Back"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
      </motion.button>
    </AnimatePresence>
  );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
