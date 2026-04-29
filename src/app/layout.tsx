import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Smart Wedding",
    startupImage: "/icons/icon-512x512.png",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Smart Wedding",
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#C5A059",
    "msapplication-tap-highlight": "no",
  },
  icons: {
    apple: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    icon: "/icons/icon-192x192.png",
  },
};

import { ToastProvider } from "@/components/Toast";
import { InstallPWA } from "@/components/InstallPWA";

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
      <body className="min-h-full flex flex-col font-sans">
        <ToastProvider>
          {children}
          <InstallPWA />
        </ToastProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.deferredPrompt = null;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                window.deferredPrompt = e;
                console.log('PWA: Early prompt captured');
              });

              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
