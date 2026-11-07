import { QueryClientProvider, RoutesProvider } from "./providers";

export const App = () => (
  <QueryClientProvider>
    <RoutesProvider />
  </QueryClientProvider>
);
