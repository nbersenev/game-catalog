import { QueryClientProvider, RoutesProvider } from "./providers";
import { ToastsProvider } from "./providers/toasts-provider";

export const App = () => (
  <QueryClientProvider>
    <ToastsProvider />
    <RoutesProvider />
  </QueryClientProvider>
);
