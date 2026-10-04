"use client";

import { useCallback, useEffect, useState } from "react";

/** Boolean preference in localStorage. Storage can be unavailable (private mode), so every access is guarded. */
export function useStoredBoolean(key: string, initial: boolean): [boolean, (next: boolean) => void] {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- storage is client-only; read after mount
      if (stored !== null) setValue(stored === "true");
    } catch {
      // Keep the default.
    }
  }, [key]);

  const update = useCallback(
    (next: boolean) => {
      setValue(next);
      try {
        localStorage.setItem(key, String(next));
      } catch {
        // Preference just won't persist.
      }
    },
    [key],
  );

  return [value, update];
}
