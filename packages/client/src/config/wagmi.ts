import {defaultWagmiConfig} from '@web3modal/wagmi/react/config'

import {cookieStorage, createStorage} from 'wagmi'
import {mainnet, sepolia} from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

export const metadata = {
    name: 'Impact Reef',
    description: 'Find your way through the coral',
    url: 'https://impactreef.wtf', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [mainnet, sepolia] as const
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    auth: {
        socials: ['farcaster'],
    },
    storage: createStorage({
        storage: cookieStorage
    }),
})