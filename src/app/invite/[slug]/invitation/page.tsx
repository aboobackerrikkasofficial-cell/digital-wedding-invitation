import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import InvitationClient from "./InvitationClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug === "demo") {
    return {
      title: "Wedding Details: Sarah & Deepak",
      description: "Complete wedding details, venue location, and RSVP.",
    };
  }

  const { data: wedding } = await supabase
    .from("weddings")
    .select("bride_name, groom_name, custom_message")
    .eq("slug", slug)
    .maybeSingle();

  if (!wedding) {
    return {
      title: "Wedding Details",
      description: "View wedding ceremony details and location.",
    };
  }

  const title = `${wedding.bride_name} & ${wedding.groom_name}'s Wedding Invitation`;
  const description = `Ceremony details, location, and RSVP for the wedding of ${wedding.bride_name} and ${wedding.groom_name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://digital-wedding-invitation.vercel.app/invite/${slug}/invitation`,
      type: "website",
      images: [
        {
          url: "https://digital-wedding-invitation.vercel.app/icons/icon-512x512.png",
          width: 512,
          height: 512,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://digital-wedding-invitation.vercel.app/icons/icon-512x512.png"],
    },
  };
}

export default function Page() {
  return <InvitationClient />;
}
