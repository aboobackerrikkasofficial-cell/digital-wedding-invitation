"use client";

import { WebRoyalPurpleIslamicTemplate } from "./web/WebRoyalPurpleIslamicTemplate";
import { Wedding } from "@/types/wedding";

interface TemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

export function RoyalPurpleIslamicTemplate(props: TemplateProps) {
  return <WebRoyalPurpleIslamicTemplate {...props} />;
}

export default RoyalPurpleIslamicTemplate;
