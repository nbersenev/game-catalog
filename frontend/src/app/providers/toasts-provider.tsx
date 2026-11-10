import { Toaster } from "sonner";

export const ToastsProvider = () => (
  <Toaster
    position="top-right"
    duration={5 * 1000}
    offset={{ top: "24px", right: "24px" }}
    gap={16}
    visibleToasts={5}
  />
);
