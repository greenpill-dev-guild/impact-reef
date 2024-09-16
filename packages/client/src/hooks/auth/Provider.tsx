"use client";

import React, { ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config, projectId, metadata } from "@/modules/wagmi";

import { siweConfig } from "@/modules/siwe";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  siweConfig,
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#0369a1",
    "--w3m-font-family": "Inter, sans-serif",
    // "--w3m-font-size-master": "16px",
  },
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
