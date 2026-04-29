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
    // Hide back button on the very first landing/login page
    const hideOn = ["/", "/admin/login"];
    setCanGoBack(!hideOn.includes(pathname));
  }, [pathname]);

  const handleBack = () => {
    // Priority: Real browser back
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      // Fallback for direct links
      router.push(pathname.startsWith("/admin") ? "/admin" : "/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-8 bg-[#C5A059] flex items-center justify-between px-3 z-[10000] select-none shadow-sm">
      {/* Left Section: Back Button & Title */}
      <div className="flex items-center gap-4">
        {canGoBack && (
          <button
            onClick={handleBack}
            className="hover:bg-black/10 rounded p-1 transition-colors text-white/90 hover:text-white"
            title="Go back"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
          </button>
        )}
        
        <span className={cn(
            "text-[11px] font-bold text-white tracking-wide uppercase font-sans",
            !canGoBack && "ml-1"
        )}>
          Smart Wedding Invitation System
        </span>
      </div>

      {/* Right Section: Visual Window Controls (Like a native app) */}
      <div className="flex items-center h-full">
        <div className="h-8 px-3 flex items-center hover:bg-white/10 transition-colors cursor-default">
          <Minus size={12} className="text-white/80" />
        </div>
        <div className="h-8 px-3 flex items-center hover:bg-white/10 transition-colors cursor-default">
          <Square size={10} className="text-white/80" />
        </div>
        <div className="h-8 px-4 flex items-center hover:bg-red-500 transition-colors cursor-default group">
          <X size={14} className="text-white/80 group-hover:text-white" />
        </div>
      </div>
    </header>
  );
}
