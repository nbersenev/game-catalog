import { memo } from "react";

interface AddGameModalProps {
  open: boolean;
  onClose(): void;
}

export const AddGameModal = memo(({ onClose, open }: AddGameModalProps) => (
  <div />
));
