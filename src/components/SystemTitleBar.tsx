"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
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
    // STRICT DETECTION: Only show if running as a Native App (Capacitor) or an Installed PWA (Standalone)
    const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.platform;
    const isStandalone = typeof window !== 'undefined' && 
      (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone);
    
    const isApp = !!(isNative || isStandalone);

    // Hide on the very first landing/login page
    const hideOn = ["/", "/admin/login"];
    
    if (hideOn.includes(pathname) || !isApp) {
      setCanGoBack(false);
      return;
    }

    setCanGoBack(true);
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
        
        <div className="flex-1 text-center">
          <span className="text-[9px] font-black text-white/60 tracking-[0.3em] uppercase font-sans">
            Smart Wedding Invitation System
          </span>
        </div>

        {/* Dashboard Button */}
        <button
          onClick={() => router.push("/admin")}
          className="hover:bg-black/10 rounded px-2 py-1 transition-colors text-white/90 hover:text-white flex items-center gap-2"
          title="Go to Dashboard"
        >
          <span className="text-[10px] font-black text-white tracking-widest uppercase font-sans">
            Dashboard
          </span>
          <LayoutDashboard size={14} strokeWidth={2.5} />
        </button>
      </header>
    </>
  );
}
