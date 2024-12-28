'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultConfig,
  connectorsForWallets,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  walletConnectWallet,
  trustWallet,
  coinbaseWallet
} from '@rainbow-me/rainbowkit/wallets';
import { 
  WagmiProvider, 
  createConfig,
  http,
} from 'wagmi';
import { bsc } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = 'HYF8ezl7Y6MVyFvSMIb6Mdhwbf90DeRq';

/*/ Configure the wallets
const wallets = [
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet,
      walletConnectWallet,
      trustWallet,
      coinbaseWallet,
    ],
  },
]; /*/


const wallets = [
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains: [bsc] }),
      walletConnectWallet({ projectId, chains: [bsc] }),
      trustWallet({ projectId, chains: [bsc] }),
      coinbaseWallet({ projectId, chains: [bsc] }),
    ],
  },
];
const connectors = connectorsForWallets(wallets, {
  projectId: projectId,
  appName: 'USVP Web3',
  chains: [bsc],
});

// Create wagmi config
const config = createConfig({
  autoConnect: true,
  connectors,
  chains: [bsc],
  transports: {
    [bsc.id]: http('https://1rpc.io/bnb'),
  },
});

// Create the tanstack query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          chains={[bsc]}
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
          })}
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}