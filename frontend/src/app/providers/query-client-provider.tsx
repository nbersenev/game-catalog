import type { ReactNode } from 'react';

import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from '@tanstack/react-query';

interface QueryClientProviderProps {
  children: ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 1000,
    },
  },
});

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => (
  <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
);
