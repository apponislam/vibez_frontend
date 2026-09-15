import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "VIBEZ",
  description: "UNLOCK YOUR CITY",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning className={cn("h-full", "antialiased", plusJakartaSans.variable, "font-sans", geist.variable)}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E9V463F1QL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E9V463F1QL');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className={`${plusJakartaSans.className} min-h-full flex flex-col`}>
        <script
          id="hydration-fix"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function cleanup() {
                  const els = document.querySelectorAll('.translate-tooltip-mtz, [class*="translate-tooltip"], .hidden_translate');
                  els.forEach(el => el.remove());
                }
                cleanup();
                const observer = new MutationObserver((mutations) => {
                  for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                      if (node.nodeType === 1) {
                        if (
                          node.classList?.contains('translate-tooltip-mtz') ||
                          node.className?.includes?.('translate-tooltip') ||
                          node.className?.includes?.('hidden_translate')
                        ) {
                          node.remove();
                        }
                      }
                    }
                  }
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
              })();
            `
          }}
        />
        <ReduxProvider>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
