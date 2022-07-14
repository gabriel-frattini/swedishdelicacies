import { useContext } from 'react';
import { QueryClientProvider } from 'react-query';

import { StoreContext } from '@/context/store-context';

export const QueryProvider = ({ children }: any) => {
  const { queryClient } = useContext(StoreContext);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
