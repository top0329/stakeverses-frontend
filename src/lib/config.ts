'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import {
  mainnet,
  sepolia,
  bscTestnet,
  polygon,
  bsc,
  polygonAmoy,
} from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

import PolygonIcon from '@/assets/images/polygon-icon.png';

const projectId = '3070123cded233b935f75e5531756a6a';

const supportedChains: readonly [Chain, ...Chain[]] = [
  mainnet,
  sepolia,
  bsc,
  bscTestnet,
  polygon,
  {
    ...polygonAmoy,
    iconUrl: PolygonIcon.src,
  },
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
