'use client';

import { ThemeProvider } from 'next-themes';
import { WagmiProvider, cookieToInitialState } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevTools } from 'jotai-devtools';

import { Web3Provider } from '@/context/web3Context';
import { config } from '@/lib/config';
import { StoreProvider, store } from '@/jotai/store';
import ToastProvider from '@/context/toastContext';
import SpinnerProvider from '@/context/spinnerContext';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
  const initialState = cookieToInitialState(config, cookie);

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <StoreProvider>
        <WagmiProvider config={config} initialState={initialState}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: '#0E76FD',
                accentColorForeground: 'white',
                borderRadius: 'large',
                fontStack: 'system',
                overlayBlur: 'small',
              })}
            >
              <ToastProvider>
                <SpinnerProvider>
                  <Web3Provider>
                    <DevTools store={store} />  
                    {children}
                  </Web3Provider>
                </SpinnerProvider>
              </ToastProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
