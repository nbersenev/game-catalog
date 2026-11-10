import { useLayoutEffect } from "react";

export const useBodyScrollLock = (isLocked: boolean) => {
  useLayoutEffect(() => {
    if (!isLocked) {
      return;
    }

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};
