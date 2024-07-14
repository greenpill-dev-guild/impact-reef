"use-client";

import { getDefaultConfig } from "connectkit";
import { optimismSepolia } from "wagmi/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [optimismSepolia],
    transports: {
      // RPC URL for each chain
      [optimismSepolia.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: "Impact Reef",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://impactreef.app", // your app's url
    appIcon: "https://impactreef.app/images/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider: React.FC<{ children: any }> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
