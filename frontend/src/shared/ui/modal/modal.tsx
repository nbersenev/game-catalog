import type { ReactNode } from "react";

import { useBodyScrollLock } from "@shared/hooks";
import cn from "classnames";

import styles from "./modal.module.css";
import { CloseIcon } from "../icons";

interface ModalProps {
  onClose(): void;
  open: boolean;
  width?: string;
  children: ReactNode;
}

export const Modal = ({
  open,
  onClose,
  children,
  width = "400px",
}: ModalProps) => {
  useBodyScrollLock(open);

  return (
    <div className={cn(styles.modalContainer, { [styles.visible]: open })}>
      <div className={styles.modal} style={{ width }}>
        <div className={styles.closeButton} onClick={onClose}><CloseIcon height="24px" width="24px" /></div>
        {children}
      </div>
    </div>
  );
};
