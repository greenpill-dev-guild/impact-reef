import "./globals.css";

import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";
import { cookieToInitialState } from "wagmi";
import type { Metadata, Viewport } from "next";

import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE,
} from "@/constants";

import { inter, sora } from "@/utils/fonts";

import { config } from "@/modules/wagmi";

import Web3ModalProvider from "@/hooks/auth/Provider";

import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";

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
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Web3ModalProvider initialState={initialState}>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            toastOptions={{
              className: "toaster",
              loading: {
                // icon: "",
                className: "toaster-loading",
              },
              error: {
                // icon: ""
                className: "toaster-error",
              },
              success: {
                // icon: ""
                className: "toaster-success",
              },
            }}
          />
        </Web3ModalProvider>
      </body>
    </html>
  );
}
