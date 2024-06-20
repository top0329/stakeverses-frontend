'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="btn !w-[180px] bg-gradient-to-r from-[#192F3A] to-[#06C2C4] lg:!w-[200px] xl:!w-[250px]"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className="btn bg-gradient-to-r from-[#192F3A] to-[#06C2C4] !text-red-600 truncate"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div>
                  <div className="flex justify-center items-center gap-2 btn bg-gradient-to-r from-[#192F3A] to-[#06C2C4] !w-auto px-4">
                    <button onClick={openChainModal} type="button">
                      {chain.hasIcon && (
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
                              src={chain.iconUrl}
                              width={24}
                              height={24}
                              alt={chain.name ?? 'Chain icon'}
                            />
                          )}
                        </div>
                      )}
                    </button>
                    <div
                      className="flex items-center cursor-pointer h-full"
                      onClick={openAccountModal}
                    >
                      {account.address.substring(0, 6)}...
                      {account.address.substring(account.address.length - 4)}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
