import { AppProps } from 'next/app';

import { StoreProvider } from '@/context/store-context';
import { QueryProvider } from '@/lib/queryClient';

import '@/styles/styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </StoreProvider>
  );
}
