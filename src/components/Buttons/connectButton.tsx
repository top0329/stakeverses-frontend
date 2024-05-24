'use client';

import React, { useEffect, useRef } from 'react';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { emojiAvatarForAddress } from '@/lib/emojiAvatarForAddress';
import Button from '@/components/Buttons';

export const ConnectWallet = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(
    address ?? ''
  );

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
          // Disconnecting wallet first because sometimes when is connected but the user is not connected
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
      <div
        className="flex justify-center items-center px-4 py-2 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
        onClick={async () => openAccountModal?.()}
      >
        <div
          role="button"
          tabIndex={1}
          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            backgroundColor,
            boxShadow: '0px 2px 2px 0px rgba(81, 98, 255, 0.20)',
          }}
        >
          {emoji}
        </div>
        <p>Account</p>
      </div>
      <Button
        text="Switch Networks"
        variant="primary"
        onClick={openChainModal}
      />
    </React.Fragment>
  );
};
