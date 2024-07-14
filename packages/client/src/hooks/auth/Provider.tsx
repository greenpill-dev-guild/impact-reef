"use client";

import { optimismSepolia } from "wagmi/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { APP_DESCRIPTION, APP_ICON, APP_NAME, APP_URL } from "@/constants";

const config = createConfig(
  getDefaultConfig({
    chains: [optimismSepolia],
    transports: {
      // RPC URL for each chain
      [optimismSepolia.id]: http(
        `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: APP_NAME,
    appDescription: APP_DESCRIPTION,
    appUrl: APP_URL,
    appIcon: APP_ICON,
  })
);

const queryClient = new QueryClient();

export const Web3Provider: React.FC<{ children: any }> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
