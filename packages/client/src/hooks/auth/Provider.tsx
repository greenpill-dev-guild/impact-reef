'use client'

import React, {ReactNode} from 'react'
import {config, projectId, metadata} from '@/config/wagmi'

import {createWeb3Modal} from '@web3modal/wagmi/react'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import {State, WagmiProvider} from 'wagmi'
import {siweConfig} from "@/config/siwe";

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
    metadata,
    wagmiConfig: config,
    projectId,
    siweConfig,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export default function Web3ModalProvider({
                                              children,
                                              initialState
                                          }: {
    children: ReactNode
    initialState?: State
}) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}