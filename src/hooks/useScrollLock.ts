import { useEffect } from "react";

// Locks the underlying page's scrollbar while isOpen is true (e.g. a modal
// or overlay is open), restoring whatever overflow value was there before.
export function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);
}
