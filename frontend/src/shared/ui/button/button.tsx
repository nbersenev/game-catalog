import type { ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  leftAdornment?: ReactNode;
  onClick(): void;
  rightAdornment?: ReactNode;
  text: string;
}

export const Button = ({
  text,
  leftAdornment,
  rightAdornment,
  onClick,
}: ButtonProps) => (
  <button className={styles.button} type="button" onClick={onClick}>
    <div className="flex items-center gap-2">
      {leftAdornment}
      {text}
      {rightAdornment}
    </div>
  </button>
);
