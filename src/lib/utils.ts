import { useMemo } from 'react';
import {
  FallbackProvider,
  JsonRpcProvider,
  BrowserProvider,
  JsonRpcSigner,
} from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';
import { type Config, useClient, useConnectorClient } from 'wagmi';

export const middleEllipsis = (str: string, len: number) => {
  if (!str) {
    return '';
  }
  return `${str.substr(0, len)}...${str.substr(str.length - len, str.length)}`;
};

export function truncateAddress(address: string): string {
  if (!address) return '';
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
}

export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network)
    );
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
}

export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const client = useClient<Config>({ chainId })!;
  return useMemo(() => clientToProvider(client), [client]);
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

export async function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}


export const calcRemainingTime = (remainingTime: number) => {
  const stakingEndTime = remainingTime;
  const stakingEndTimeInMs = stakingEndTime * 1000;
  const currentTimeInMs = Date.now();
  const remainingTimeInMs = stakingEndTimeInMs - currentTimeInMs;
  const remainingDays = Math.ceil(remainingTimeInMs / (1000 * 60 * 60 * 24));
  if(remainingDays < 0) {
    return 0;
  }
  return remainingDays;
};

export const transition = {
  type: 'spring',
  stiffness: 200,
  damping: 10,
};
