"use client";

import { Wedding } from "@/types/wedding";
import { RoyalPurpleThankYou } from "./RoyalPurpleThankYou";
import { CreamGoldThankYou } from "./CreamGoldThankYou";
import { StandardThankYou } from "./StandardThankYou";

interface RsvpData {
  is_attending: boolean;
  name?: string;
  [key: string]: unknown;
}

interface ThankYouPageProps {
  wedding: Wedding;
  rsvpData: RsvpData;
}

export function ThankYouPage({ wedding, rsvpData }: ThankYouPageProps) {
  const templateId = wedding.template_id;

  // Dispatcher to render the correct theme-specific Thank You page
  switch (templateId) {
    case 'royal':
    case 'muslim-royal':
      return <RoyalPurpleThankYou wedding={wedding} rsvpData={rsvpData} />;
    
    case 'muslim-3': // Cream & Gold
      return <CreamGoldThankYou wedding={wedding} rsvpData={rsvpData} />;
    
    default:
      return <StandardThankYou wedding={wedding} rsvpData={rsvpData} />;
  }
}
