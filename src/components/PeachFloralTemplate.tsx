"use client";

import { WebPeachFloralTemplate } from "./web/WebPeachFloralTemplate";
import { Wedding } from "@/types/wedding";

interface TemplateProps {
  wedding: Wedding;
  onAttend: () => void;
  onNotAttend: () => void;
}

export function PeachFloralTemplate(props: TemplateProps) {
  return <WebPeachFloralTemplate {...props} />;
}

export default PeachFloralTemplate;
