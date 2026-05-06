"use client";

import { useEffect, useState } from "react";
import { WebCreamGoldIslamicTemplate } from "./web/WebCreamGoldIslamicTemplate";
import { MobileCreamGoldIslamicTemplate } from "./mobile/MobileCreamGoldIslamicTemplate";
import { Wedding } from "@/types/wedding";

interface TemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

export function CreamGoldIslamicTemplate(props: TemplateProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const isNative = (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
    setIsMobile(!!isNative);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return <MobileCreamGoldIslamicTemplate {...props} />;
  }

  return <WebCreamGoldIslamicTemplate {...props} />;
}

export default CreamGoldIslamicTemplate;
