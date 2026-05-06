"use client";

import { useEffect, useState } from "react";
import { WebPeachFloralTemplate } from "./web/WebPeachFloralTemplate";
import { MobilePeachFloralTemplate } from "./mobile/MobilePeachFloralTemplate";
import { Wedding } from "@/types/wedding";

interface PeachFloralTemplateProps {
  wedding: Wedding;
  onAttend: () => void;
  onNotAttend: () => void;
}

export function PeachFloralTemplate(props: PeachFloralTemplateProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const isNative = (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
    setIsMobile(!!isNative);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return <MobilePeachFloralTemplate {...props} />;
  }

  return <WebPeachFloralTemplate {...props} />;
}

export default PeachFloralTemplate;
