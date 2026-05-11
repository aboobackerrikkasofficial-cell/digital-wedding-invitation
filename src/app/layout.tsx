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
  title: "Smart Wedding Invitation System",
  description: "Elegant digital wedding invitations with integrated RSVP",
  manifest: "/manifest.json",
  icons: {
    apple: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    icon: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Smart Wedding",
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
