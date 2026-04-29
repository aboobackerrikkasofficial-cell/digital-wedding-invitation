"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Minus, Square, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * SystemTitleBar - A global app-level header that looks like a native title bar.
 * Contains the global back button, app title, and window controls.
 */
export function SystemTitleBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if running as a standalone PWA
    const isStandalone = typeof window !== 'undefined' && 
      (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone);

    // Hide back button on the very first landing/login page
    // Also hide on the main admin dashboard to avoid overlapping the sidebar
    const hideOn = ["/", "/admin/login", "/admin"];
    
    if (hideOn.includes(pathname)) {
      setCanGoBack(false);
      return;
    }

    // For invitation links, only show the back bar if we are in the "Web App" (Standalone)
    // If it's a regular browser, hide it to keep the invitation clean.
    if (pathname.startsWith('/invite')) {
      setCanGoBack(!!isStandalone);
    } else {
      // For all other pages (Admin, etc.), show the back bar normally
      setCanGoBack(true);
    }
  }, [pathname]);

  const handleBack = () => {
    // True browser back behavior
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback for direct links
      router.push(pathname.startsWith("/admin") ? "/admin" : "/");
    }
  };


  if (!canGoBack) return null;

  return (
    <>
      <div className="h-8 w-full flex-shrink-0" /> {/* Spacer to prevent content overlap */}
      <header className="fixed top-0 left-0 right-0 h-8 bg-[#C5A059] flex items-center px-3 z-[10000] select-none shadow-sm">
        <button
          onClick={handleBack}
          className="hover:bg-black/10 rounded p-1 transition-colors text-white/90 hover:text-white flex items-center gap-2"
          title="Go back"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span className="text-[11px] font-black text-white tracking-widest uppercase font-sans">
            Back
          </span>
        </button>
        
        <div className="flex-1 text-center pr-10">
          <span className="text-[9px] font-black text-white/60 tracking-[0.3em] uppercase font-sans">
            Smart Wedding Invitation System
          </span>
        </div>
      </header>
    </>
  );
}
