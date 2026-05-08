"use client";

import { useEffect, useState } from "react";
import { WebInvitationLanding } from "./web/WebInvitationLanding";
import { MobileInvitationLanding } from "./mobile/MobileInvitationLanding";
import { Wedding } from "@/types/wedding";

interface InvitationLandingProps {
  wedding: Wedding;
  onAttend: () => void;
  onNotAttend: () => void;
}

export function InvitationLanding(props: InvitationLandingProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isCapacitor = (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
      const isSmallScreen = window.innerWidth < 1024; // Use 1024 to catch tablets too
      setIsMobile(!!(isCapacitor || isStandalone || isSmallScreen));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return <MobileInvitationLanding {...props} />;
  }

  return <WebInvitationLanding {...props} />;
}

export default InvitationLanding;
