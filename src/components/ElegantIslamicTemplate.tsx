"use client";

import { WebElegantIslamicTemplate } from "./web/WebElegantIslamicTemplate";
import { Wedding } from "@/types/wedding";

interface TemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

export function ElegantIslamicTemplate(props: TemplateProps) {
  return <WebElegantIslamicTemplate {...props} />;
}

export default ElegantIslamicTemplate;
