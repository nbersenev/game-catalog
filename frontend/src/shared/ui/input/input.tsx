import { useCallback, useRef, type ChangeEvent, type ReactNode } from 'react';
import cn from 'classnames';

import styles from './input.module.css';
import { Spinner } from '../spinner';

interface InputProps {
  isError?: boolean;
  isLoading?: boolean;
  leftAdornment?: ReactNode;
  onChange(value: string): void;
  placeholder?: string;
  rightAdornment?: ReactNode;
  value: string;
}

export const Input = ({
  isError,
  isLoading,
  leftAdornment,
  onChange,
  placeholder,
  rightAdornment,
  value,
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
    <div
      className={cn(
        styles.inputContainer,
        { [styles.active]: !!value },
        { [styles.error]: isError },
      )}
      onClick={handleClick}>
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
