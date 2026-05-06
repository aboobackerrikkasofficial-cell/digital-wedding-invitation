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
    const isNative = (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
    setIsMobile(!!isNative);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return <MobileElegantIslamicTemplate {...props} />;
  }

  return <WebElegantIslamicTemplate {...props} />;
}

export default ElegantIslamicTemplate;
