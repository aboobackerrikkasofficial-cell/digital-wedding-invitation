"use client";

import { WebCreamGoldIslamicTemplate } from "./web/WebCreamGoldIslamicTemplate";
import { Wedding } from "@/types/wedding";

interface TemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

export function CreamGoldIslamicTemplate(props: TemplateProps) {
  return <WebCreamGoldIslamicTemplate {...props} />;
}

export default CreamGoldIslamicTemplate;
