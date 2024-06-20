'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import {
  mainnet,
  sepolia,
  bscTestnet,
  polygon,
  polygonMumbai,
  bsc,
} from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = '3070123cded233b935f75e5531756a6a';

const supportedChains: Chain[] = [
  mainnet,
  sepolia,
  bsc,
  bscTestnet,
  polygon,
  polygonMumbai,
];

export const config = getDefaultConfig({
  appName: 'WalletConnection',
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
