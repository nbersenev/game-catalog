import type { ReactNode } from 'react';

import cn from 'classnames';

import styles from './button.module.css';
import { Spinner } from '../spinner';

interface ButtonProps {
  leftAdornment?: ReactNode;
  onClick(): void;
  rightAdornment?: ReactNode;
  text: string;
  isLoading?: boolean;
  size?: 'large' | 'medium';
}

export const Button = ({
  text,
  leftAdornment,
  rightAdornment,
  onClick,
  size = 'large',
  isLoading,
}: ButtonProps) => (
  <button
    className={cn(
      styles.button,
      { [styles.large]: size === 'large' },
      { [styles.medium]: size === 'medium' },
      { 'pointer-events-none': isLoading },
    )}
    type="button"
    onClick={onClick}>
    <div className="flex items-center gap-2">
      {leftAdornment}
      {text}
      {rightAdornment}
      {isLoading && <Spinner size={16} />}
    </div>
  </button>
);
