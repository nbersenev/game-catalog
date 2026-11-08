import { useCallback, useRef, type ChangeEvent, type ReactNode } from "react";
import styles from "./input.module.css";
import { Spinner } from "../spinner";

interface InputProps {
  leftAdornment?: ReactNode;
  onChange(value: string): void;
  rightAdornment?: ReactNode;
  placeholder?: string;
  isLoading?: boolean;
  value: string;
}

export const Input = ({
  value,
  placeholder,
  leftAdornment,
  rightAdornment,
  isLoading,
  onChange,
}: InputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    ref.current?.focus();
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={styles.inputContainer} onClick={handleClick}>
      {leftAdornment}
      <input
        ref={ref}
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {rightAdornment}
      {isLoading && <Spinner size={24} />}
    </div>
  );
};
