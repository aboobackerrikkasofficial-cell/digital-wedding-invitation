"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Smartphone, Info, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPWA() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Only show install prompt on admin pages
    if (!pathname.startsWith('/admin')) {
      setIsVisible(false);
      return;
    }

    // 1. Check if already standalone
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    
    if (isStandalone) return;

    // 2. Check for iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // 3. Check for early captured prompt from layout.tsx
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
      setIsVisible(true);
      console.log("PWA: Using early captured prompt");
    }

    // 4. Listen for native prompt (for later firing)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
      console.log("PWA: Native install prompt available");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 5. Force visibility after delay (Fallback for all devices)
    const timer = setTimeout(() => {
        if (!isStandalone) {
            setIsVisible(true);
            const isSecure = window.isSecureContext;
            console.log(`PWA: Showing install option (Fallback mode). Secure context: ${isSecure}`);
            if (!isSecure && !iOS) {
              console.warn("PWA: Direct install is unavailable on mobile because this is not a secure (HTTPS) context.");
            }
        }
    }, 5000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    // Check global window object again just in case state is stale
    const promptToUse = deferredPrompt || (window as any).deferredPrompt;

    if (promptToUse) {
      console.log("PWA: Triggering native prompt");
      try {
        await promptToUse.prompt();
        const { outcome } = await promptToUse.userChoice;
        console.log(`PWA: Installation outcome: ${outcome}`);
        if (outcome === 'accepted') {
          setIsVisible(false);
          (window as any).deferredPrompt = null;
        }
      } catch (err) {
        console.error("PWA: Error during prompt:", err);
        setShowInstructions(true);
      }
    } else {
      console.log("PWA: Native prompt unavailable, showing manual instructions");
      setShowInstructions(true);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && !showInstructions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 pointer-events-none"
          >
            <button
              onClick={handleInstallClick}
              className="pointer-events-auto flex items-center gap-2 bg-[#C5A059] hover:bg-[#B48E48] text-white px-4 py-2.5 rounded-lg shadow-xl shadow-black/20 border border-white/10 transition-all active:scale-95 group"
            >
              <Download size={16} className="group-hover:bounce" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] opacity-70 font-medium uppercase tracking-tighter">Get App</span>
                <span className="text-[13px] font-bold uppercase tracking-widest whitespace-nowrap">Install Now</span>
              </div>
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="pointer-events-auto p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-lg text-white/60 hover:text-white transition-all border border-white/5"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInstructions && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1a1a1a] w-full max-w-md rounded-2xl border border-white/10 p-8 text-center relative"
            >
              <button 
                onClick={() => setShowInstructions(false)}
                className="absolute top-6 right-6 p-2 text-white/20 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#C5A059]">
                <Info size={32} />
              </div>

              <h3 className="text-white text-xl font-bold mb-4">
                {isIOS ? "Install on iOS" : "Install App"}
              </h3>
              
              <div className="space-y-6 text-left">
                {isIOS ? (
                  <>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-gold/20 text-[#C5A059] rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Tap the <strong>Share</strong> button (box with arrow) at the bottom of Safari.
                      </p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-gold/20 text-[#C5A059] rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-gold/20 text-[#C5A059] rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Tap the <strong>three dots</strong> (menu) in your browser corner.
                      </p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-gold/20 text-[#C5A059] rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Select <strong>&quot;Install App&quot;</strong> or <strong>&quot;Add to Home Screen&quot;</strong>.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-8 bg-[#C5A059] hover:bg-[#B48E48] text-white py-4 rounded-xl font-bold transition-all"
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
