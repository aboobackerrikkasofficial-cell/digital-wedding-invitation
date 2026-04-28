"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share, Plus } from "lucide-react";

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
  const [showPopup, setShowPopup] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) {
        requestAnimationFrame(() => setIsDismissed(true));
    }

    // Check if it's already installed
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    // Check if it's iOS
    const ua = window.navigator.userAgent;
    const isIPad = !!ua.match(/iPad/i);
    const isIPhone = !!ua.match(/iPhone/i);
    const iOS = isIPad || isIPhone;
    
    // Use requestAnimationFrame for all state updates to avoid cascading renders
    requestAnimationFrame(() => {
      setIsStandalone(isStandaloneMode);
      setIsIOS(iOS);
    });

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser prompt
      e.preventDefault();
      // Save the event
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show our custom popup if not already standalone and not dismissed
      if (!isStandaloneMode && !dismissed) {
        setShowPopup(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Auto-show iOS instructions if not standalone and not dismissed
    if (iOS && !isStandaloneMode && !dismissed) {
        const timer = setTimeout(() => setShowPopup(true), 3000);
        return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the browser install prompt
    deferredPrompt.prompt();

    // Wait for the user response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);

    if (outcome === 'accepted') {
        setShowPopup(false);
    }

    // Reset
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
      setShowPopup(false);
      localStorage.setItem("pwa-prompt-dismissed", "true");
      setIsDismissed(true);
  };

  if (isStandalone || isDismissed) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-2 md:p-4 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-2xl md:rounded-full border border-white/10 shadow-[0_-10px_50px_rgba(0,0,0,0.4)] overflow-hidden pointer-events-auto">
            <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 gap-4">
              
              {/* App Icon & Info */}
              <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold/20">
                    <Download className="text-white" size={20} />
                </div>
                <div className="overflow-hidden">
                    <h3 className="text-white font-bold text-[11px] md:text-sm whitespace-nowrap overflow-hidden text-ellipsis leading-tight">Install Invitation App</h3>
                    <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest font-black truncate mt-0.5">Fast Access • Offline View</p>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                {isIOS ? (
                    <div className="hidden sm:flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-tighter font-bold">
                        <Share size={12} className="text-blue-400" />
                        <span>Tap Share &gt; Add to Home Screen</span>
                    </div>
                ) : (
                    <button
                        onClick={handleInstallClick}
                        className="bg-gold text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-gold/90 transition-all active:scale-95 shadow-lg shadow-gold/20 whitespace-nowrap"
                    >
                        Install
                    </button>
                )}
                
                <button 
                  onClick={handleDismiss}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {/* iOS specific mobile instruction (tiny footer) */}
            {isIOS && (
                <div className="sm:hidden bg-white/5 px-6 py-2 border-t border-white/5 text-[9px] text-center text-white/60 font-medium">
                   Tap <Share size={10} className="inline mx-0.5 text-blue-400" /> then <Plus size={10} className="inline mx-0.5" /> &quot;Add to Home Screen&quot;
                </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
