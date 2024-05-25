import "./globals.css";
import "@farcaster/auth-kit/styles.css";

import { Toaster } from "react-hot-toast";
import type { Metadata, Viewport } from "next";

import { inter, sora } from "@/utils/fonts";

import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";

const APP_NAME = "Impact Coral Reef";
const APP_DEFAULT_TITLE = "Impact Coral Reef";
const APP_TITLE_TEMPLATE = "%s - Impact Coral Reef";
const APP_DESCRIPTION = "";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen w-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
