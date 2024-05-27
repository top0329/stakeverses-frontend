'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import Button from '@/components/Buttons';
import { truncateAddress } from '@/lib/utils';

export const ConnectWallet = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <Button
        text={isConnecting ? 'Connecting...' : 'Connect Wallet'}
        variant="primary"
        onClick={async () => {
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      />
    );
  }

  if (isConnected && !chain) {
    return (
      <Button text="Wrong network" variant="primary" onClick={openChainModal} />
    );
  }

  return (
    <React.Fragment>
      {/* <div
        className="flex justify-center items-center px-4 py-2 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
        onClick={openChainModal}
      >
        <div
          role="button"
          tabIndex={1}
          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
        >
          {chain?.hasIcon && (
            <div
              className="text-white text-lg"
              style={{
                background: chain.iconBackground,
                width: 24,
                height: 24,
                borderRadius: 999,
                overflow: 'hidden',
                marginRight: 4,
              }}
            >
              {chain.iconUrl && (
                <Image
                  alt={chain.name ?? 'Chain icon'}
                  src={chain.iconUrl}
                  style={{ width: 24, height: 24 }}
                />
              )}
            </div>
          )}
        </div>
      </div> */}
      <Button
        text={`${truncateAddress(address ?? '')}`}
        variant="primary"
        onClick={async () => openAccountModal?.()}
      />
    </React.Fragment>
  );
};
