"use client";

import { useEffect } from "react";

/**
 * PWA Install Button Component
 * Strictly follows the requirements:
 * - Dynamic JS-based creation
 * - Listens for beforeinstallprompt
 * - Handles visibility based on event availability
 * - Works only on supported browsers (not iOS)
 */
export function InstallPWA() {
  useEffect(() => {
    // 1. Initial Visibility & Standalone Check
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    
    // 2. Check for iOS (Apple devices)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isStandalone || isIOS) {
      console.log("PWA install prompt not available (already installed or unsupported browser/iOS)");
      return;
    }

    let deferredPrompt: any = null;
    let installBtn: HTMLButtonElement | null = null;

    // 3. Define Button Creation Logic
    const createButton = () => {
      if (installBtn) return installBtn;

      const btn = document.createElement("button");
      btn.innerText = "Install App";
      
      // Strict UI Requirements (JS Styles)
      Object.assign(btn.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "9999",
        padding: "8px 12px",
        backgroundColor: "#C5A059", // Match gold theme
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        opacity: "0",
        transform: "translateY(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      });

      // Hover Effects
      btn.onmouseenter = () => { btn.style.backgroundColor = "#B48E48"; btn.style.transform = "translateY(-2px)"; };
      btn.onmouseleave = () => { btn.style.backgroundColor = "#C5A059"; btn.style.transform = "translateY(0)"; };

      btn.onclick = async () => {
        if (deferredPrompt) {
          console.log("Triggering PWA install prompt...");
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response to install prompt: ${outcome}`);
          
          // Hide button after interaction
          btn.style.opacity = "0";
          btn.style.pointerEvents = "none";
          setTimeout(() => btn.remove(), 300);
          deferredPrompt = null;
        }
      };

      document.body.appendChild(btn);
      
      // Trigger smooth fade-in
      requestAnimationFrame(() => {
        btn.style.opacity = "1";
        btn.style.transform = "translateY(0)";
      });

      console.log("PWA Install Button shown to user");
      return btn;
    };

    // 4. Listen for Native Install Event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Mandatory: Prevent default behavior
      e.preventDefault();
      
      // Mandatory: Store event
      deferredPrompt = e;
      console.log("PWA beforeinstallprompt event captured");

      // Mandatory: ONLY show after this event fires
      installBtn = createButton();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Failsafe Timeout
    const failsafe = setTimeout(() => {
      if (!deferredPrompt) {
        console.log("PWA install prompt not available (Event did not fire within failsafe period)");
      }
    }, 5000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      clearTimeout(failsafe);
      if (installBtn) installBtn.remove();
    };
  }, []);

  return null; // This component renders nothing itself, only manipulates the DOM via JS
}
