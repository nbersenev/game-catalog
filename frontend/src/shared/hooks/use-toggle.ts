import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from "react";

export const useToggle = (
  value: boolean,
): [boolean, () => void, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [enabled, setEnabled] = useState(value);

  const enable = useCallback(() => setEnabled(true), []);

  const disable = useCallback(() => setEnabled(false), []);

  return [enabled, enable, disable, setEnabled];
};
