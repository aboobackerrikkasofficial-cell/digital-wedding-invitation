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
    const isNative = (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
    setIsMobile(!!isNative);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return <MobileInvitationLanding {...props} />;
  }

  return <WebInvitationLanding {...props} />;
}

export default InvitationLanding;
