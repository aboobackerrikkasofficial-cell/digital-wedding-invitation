"use client";

import { useEffect, useState } from "react";
import { WebRoyalPurpleIslamicTemplate } from "./web/WebRoyalPurpleIslamicTemplate";
import { MobileRoyalPurpleIslamicTemplate } from "./mobile/MobileRoyalPurpleIslamicTemplate";
import { Wedding } from "@/types/wedding";

interface TemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

export function RoyalPurpleIslamicTemplate(props: TemplateProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const isNative = (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
    setIsMobile(!!isNative);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return <MobileRoyalPurpleIslamicTemplate {...props} />;
  }

  return <WebRoyalPurpleIslamicTemplate {...props} />;
}

export default RoyalPurpleIslamicTemplate;
