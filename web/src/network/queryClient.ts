import { QueryClient } from '@tanstack/react-query';

const ONE_MINUTE = 1000 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: ONE_MINUTE,
      gcTime: 3 * ONE_MINUTE,
      refetchOnMount: 'always',
      refetchOnReconnect: 'always',
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
