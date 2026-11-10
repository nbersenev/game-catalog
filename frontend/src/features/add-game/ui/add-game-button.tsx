import { Button, PlusIcon } from "@shared/ui";
import { useToggle } from "@shared/hooks";
import { memo } from "react";

import { AddGameModal } from "./add-game-modal";

export const AddGameButton = memo(() => {
  const [isOpenModal, openModal, closeModal] = useToggle(false);

  return (
    <>
      <Button
        text="Добавить"
        leftAdornment={<PlusIcon height="24px" width="24px" />}
        onClick={openModal}
      />
      <AddGameModal open={isOpenModal} onClose={closeModal} />
    </>
  );
});
