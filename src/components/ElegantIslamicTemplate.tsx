"use client";

import { useEffect, useState } from "react";
import { WebElegantIslamicTemplate } from "./web/WebElegantIslamicTemplate";
import { MobileElegantIslamicTemplate } from "./mobile/MobileElegantIslamicTemplate";
import { Wedding } from "@/types/wedding";

interface ElegantTemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

export function ElegantIslamicTemplate(props: ElegantTemplateProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isNative = (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(isNative || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return <MobileElegantIslamicTemplate {...props} />;
  }

  return <WebElegantIslamicTemplate {...props} />;
}

export default ElegantIslamicTemplate;
