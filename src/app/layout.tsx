import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MobileInitializationWrapper } from "@/components/MobileInitializationWrapper";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#C5A059",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Official Wedding Invitation | Fathimath Ayisha Thasneem & Muhammed Thameem MD",
  description: "With the blessings of our families, we warmly invite you to our wedding celebration.",
  manifest: "/manifest.json",
  icons: {
    apple: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    icon: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Official Wedding Invitation",
  },
  openGraph: {
    title: "Official Wedding Invitation | Fathimath Ayisha Thasneem & Muhammed Thameem MD",
    description: "With the blessings of our families, we warmly invite you to our wedding celebration.",
    url: "https://digital-wedding-invitation-two.vercel.app/",
    type: "website",
    siteName: "Smart Wedding Invitation",
    images: [
      {
        url: "/cream-gold-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Official Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Wedding Invitation | Fathimath Ayisha Thasneem & Muhammed Thameem MD",
    description: "With the blessings of our families, we warmly invite you to our wedding celebration.",
    images: ["/cream-gold-thumbnail.png"],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* TEST PWA INSTALL FEATURE - Reversible Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body 
        className="min-h-full flex flex-col font-sans bg-white"
        suppressHydrationWarning
      >
        <MobileInitializationWrapper>
          <PWAInstallPrompt /> {/* TEST PWA INSTALL PROMPT */}
          {children}
        </MobileInitializationWrapper>
      </body>
    </html>
  );
}
