"use client";

import { useState, useEffect } from "react";
import { MobileScrollFix } from "./MobileScrollFix";
import { CapacitorNavigationHandler } from "./CapacitorNavigationHandler";
import { SystemTitleBar } from "./SystemTitleBar";
import { ToastProvider } from "./Toast";

export function MobileInitializationWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Global error listener for mobile debugging
    const handleError = (e: ErrorEvent) => {
      console.error("Global Mobile Error:", e.error);
      // Only show error UI if on native platform to avoid annoying web users
      if (typeof window !== 'undefined' && (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web') {
        setError(e.message);
      }
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Smart Wedding Initializing...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white p-10 flex flex-col items-center justify-center text-center">
        <p className="text-red-500 font-bold mb-4">Mobile Initialization Error</p>
        <p className="text-gray-400 text-[10px] mb-8">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-black text-white px-8 py-3 rounded-xl font-bold"
        >
          Try Reload
        </button>
      </div>
    );
  }

  return (
    <>
      <MobileScrollFix />
      <CapacitorNavigationHandler />
      <SystemTitleBar />
      <ToastProvider>
        {children}
      </ToastProvider>
    </>
  );
}
