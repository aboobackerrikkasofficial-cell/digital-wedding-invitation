"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share, Plus, Smartphone, Info } from "lucide-react";

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
  const [showInstructions, setShowInstructions] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if it's already installed
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    
    setIsStandalone(isStandaloneMode);

    // Check if it's iOS
    const ua = window.navigator.userAgent;
    const isIPad = !!ua.match(/iPad/i);
    const isIPhone = !!ua.match(/iPhone/i);
    const iOS = isIPad || isIPhone;
    setIsIOS(iOS);

    // If iOS, we can show instructions after a delay because there's no event
    if (iOS && !isStandaloneMode) {
      const timer = setTimeout(() => setShowPopup(true), 6000);
      return () => clearTimeout(timer);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isStandaloneMode) {
        // Show the bar IMMEDIATELY when the browser is ready for direct install
        setShowPopup(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // NATIVE DIRECT INSTALL
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPopup(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      // iOS MANUAL INSTALL (REQUIRED BY APPLE)
      setShowInstructions(true);
    }
  };

  if (isStandalone) return null;

  return (
    <>
      <AnimatePresence>
        {showPopup && !showInstructions && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-lg pointer-events-none"
          >
            <div className="bg-[#1a1a1a] backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center shadow-lg shadow-gold/20 flex-shrink-0">
                  <Download className="text-white" size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-white font-bold text-base md:text-lg">Download as App</h3>
                  <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest font-black">Fast Access • Offline View</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="bg-gold text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    {isIOS ? <Share size={14} /> : <Smartphone size={14} />}
                    {isIOS ? "Install" : "Direct Install"}
                  </button>
                  <button onClick={() => setShowPopup(false)} className="p-2 text-white/20 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInstructions && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1a1a1a] w-full max-w-md rounded-[2.5rem] border border-white/10 p-8 text-center relative"
            >
              <button 
                onClick={() => setShowInstructions(false)}
                className="absolute top-6 right-6 p-2 text-white/20 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <Info size={40} />
              </div>

              <h3 className="text-white text-2xl font-bold mb-4">iOS Installation</h3>
              
              <div className="space-y-6 text-left">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Tap the <Share className="inline text-blue-400 mx-1" size={18} /> <strong>Share</strong> button in Safari.
                  </p>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Scroll down and select <strong>&quot;Add to Home Screen&quot;</strong>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-8 bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold transition-all"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
