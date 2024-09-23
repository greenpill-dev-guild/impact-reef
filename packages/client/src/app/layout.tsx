import "./globals.css";

import Image from "next/image";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";
import type { Metadata, Viewport } from "next";
import { cookieToInitialState } from "wagmi";

import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE,
} from "@/constants";

import { inter, sora } from "@/modules/fonts";

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
    >
      <body>
        <Web3ModalProvider initialState={initialState}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            containerClassName="toaster"
            toastOptions={{
              loading: {
                icon: (
                  <Image
                    src="/icons/reef.svg"
                    alt="loading toast icon"
                    className="grid aspect-square h-20 w-20 place-items-center"
                    width={72}
                    height={72}
                  />
                ),
              },
              error: {
                icon: (
                  <Image
                    src="/icons/reef-orange.svg"
                    alt="error toast icon"
                    className="grid aspect-square h-20 w-20 place-items-center"
                    width={46}
                    height={69}
                  />
                ),
              },
              success: {
                icon: (
                  <Image
                    src="/icons/fish.svg"
                    alt="success toast icon"
                    className="grid aspect-square h-20 w-20 place-items-center"
                    width={72}
                    height={72}
                  />
                ),
              },
            }}
          />
        </Web3ModalProvider>
      </body>
    </html>
  );
}
