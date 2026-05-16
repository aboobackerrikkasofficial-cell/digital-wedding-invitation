import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import EntryPageClient from "./EntryPageClient";

import { headers } from "next/headers";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const headerList = await headers();
  const host = headerList.get("host") || "digital-wedding-invitation.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  
  // Custom Metadata for the specific invitation
  if (slug === "thameem-weds-ayisha" || slug === "mirshad") {
    const title = "Official Wedding Invitation | Fathimath Ayisha Thasneem & Muhammed Thameem MD";
    const description = "With the blessings of our families, we warmly invite you to our wedding celebration.";
    const imageUrl = `${baseUrl}/cream-gold-thumbnail.png`;
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${baseUrl}/invite/${slug}`,
        type: "website",
        siteName: "Smart Wedding Invitation",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: "Official Wedding Invitation | Fathimath Ayisha Thasneem & Muhammed Thameem MD",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  }

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
  const imageUrl = `${baseUrl}/icons/icon-512x512.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/invite/${slug}`,
      type: "website",
      siteName: "Smart Wedding Invitation",
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
}

export default function Page() {
  return <EntryPageClient />;
}
