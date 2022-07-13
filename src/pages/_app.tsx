import { AppProps } from 'next/app';

import '@/styles/styles.css';

import { StoreProvider } from '@/context/store-context';
import { queryClient } from '@/lib/queryClient';

import { QueryClientProvider } from 'react-query';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </StoreProvider>
  );
}
