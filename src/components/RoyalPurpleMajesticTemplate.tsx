"use client";

import { WebRoyalPurpleMajesticTemplate } from "./web/WebRoyalPurpleMajesticTemplate";
import { Wedding } from "@/types/wedding";

interface TemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

export function RoyalPurpleMajesticTemplate(props: TemplateProps) {
  return <WebRoyalPurpleMajesticTemplate {...props} />;
}

export default RoyalPurpleMajesticTemplate;
