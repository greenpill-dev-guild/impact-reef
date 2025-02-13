import { optimism } from "wagmi/chains";
import { cookieStorage, createStorage } from "wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { APP_DESCRIPTION, APP_ICON, APP_NAME, APP_URL } from "@/constants";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: APP_URL, // origin must match your domain & subdomain
  icons: [APP_ICON],
};

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [optimism],
  projectId,
  metadata,
  ssr: true,
  auth: {},
  storage: createStorage({
    storage: cookieStorage,
  }),
});
