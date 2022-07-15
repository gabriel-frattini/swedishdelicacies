import { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';

import { StoreProvider } from '@/context/store-context';
import { queryClient } from '@/lib/queryClient';

import '@/styles/styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </StoreProvider>
  );
}
