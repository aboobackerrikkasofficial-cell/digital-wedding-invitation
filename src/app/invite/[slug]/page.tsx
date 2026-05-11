import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import EntryPageClient from "./EntryPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug === "demo") {
    return {
      title: "Wedding Invitation Demo: Sarah & Deepak",
      description: "Experience our high-end digital wedding invitation system.",
    };
  }

  const { data: wedding } = await supabase
    .from("weddings")
    .select("bride_name, groom_name, custom_message")
    .eq("slug", slug)
    .maybeSingle();

  if (!wedding) {
    return {
      title: "Wedding Invitation",
      description: "You are cordially invited to celebrate our special day.",
    };
  }

  const title = `Wedding Invitation: ${wedding.bride_name} & ${wedding.groom_name}`;
  const description = wedding.custom_message || `Join us for the wedding of ${wedding.bride_name} and ${wedding.groom_name}. Click to view details and RSVP.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://digital-wedding-invitation.vercel.app/invite/${slug}`,
      type: "website",
      siteName: "Smart Wedding Invitation",
      images: [
        {
          url: "https://digital-wedding-invitation.vercel.app/icons/icon-512x512.png",
          width: 512,
          height: 512,
          alt: `${wedding.bride_name} & ${wedding.groom_name} Wedding`,
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
  return <EntryPageClient />;
}
