"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Detect if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    
    if (isStandalone) return;

    // 2. Listen for the native install prompt event (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser-provided prompt
      e.preventDefault();
      // Store the event for later trigger
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the button only when installation is actually possible
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Trigger the native install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    
    // Clear the prompt event
    setDeferredPrompt(null);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  // Only render for supported browsers when prompt is available
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInstallClick}
          className="flex items-center gap-2 bg-[#9E7E45] hover:bg-[#735B32] text-white px-4 py-2.5 rounded-full shadow-lg shadow-black/20 border border-white/10 transition-all group pointer-events-auto"
        >
          <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
          <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Install App</span>
        </motion.button>

        <button 
          onClick={handleDismiss}
          className="p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white/60 hover:text-white transition-all border border-white/5 pointer-events-auto"
          title="Dismiss"
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
