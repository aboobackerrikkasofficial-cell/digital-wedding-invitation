"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Global App-Level Back Button
 * Handles history-based navigation with a fallback to home/dashboard.
 */
export function GlobalBackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide back button on the root landing page and login page
    const hideOn = ["/", "/admin/login"];
    setIsVisible(!hideOn.includes(pathname));
  }, [pathname]);

  if (!isVisible) return null;

  const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/track");

  const handleBack = () => {
    // Check if there is actual history to go back to
    // window.history.length > 1 is the standard check
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      // Fallback if no history exists (e.g., opened via direct link)
      router.push(isAdminPage ? "/admin" : "/");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className={cn(
          "fixed z-[9999] pointer-events-none",
          // Align with admin sidebar on desktop, otherwise top-left
          isAdminPage ? "top-0 left-0 right-0 h-16 md:h-0" : "top-0 left-0"
        )}
      >
        <div className={cn(
          "flex items-center h-16 px-4 pointer-events-auto",
          isAdminPage && "md:ml-[288px] md:h-20" // Align with Admin Sidebar width (w-72 = 288px)
        )}>
          <button
            onClick={handleBack}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-90",
              "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-gray-800 shadow-sm",
              isAdminPage ? "md:bg-gray-100/50 md:hover:bg-gray-100 md:border-gray-200" : "text-white md:text-gray-800"
            )}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
