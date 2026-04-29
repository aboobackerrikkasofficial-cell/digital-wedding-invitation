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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
            // Priority: Real browser back
            if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
            } else {
                // Fallback for direct links
                router.push(isAdminPage ? "/admin" : "/");
            }
        }}
        className={cn(
            "fixed z-[3000] flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-md transition-all active:scale-90 text-gray-500 hover:text-black",
            isAdminPage 
              ? "top-3 md:left-[288px] left-3" // Aligned exactly with sidebar top
              : "top-3 left-3"
        )}
        title="Go Back"
      >
        <ArrowLeft size={20} />
      </motion.button>
    </AnimatePresence>
  );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
