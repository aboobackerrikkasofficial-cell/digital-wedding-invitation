"use client";

import { WebInvitationLanding } from "./web/WebInvitationLanding";
import { Wedding } from "@/types/wedding";

interface InvitationLandingProps {
  wedding: Wedding;
  onAttend: () => void;
  onNotAttend: () => void;
}

export function InvitationLanding(props: InvitationLandingProps) {
  return <WebInvitationLanding {...props} />;
}

export default InvitationLanding;
