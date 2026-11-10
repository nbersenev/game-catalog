import { Button, Modal, PlusIcon } from "@shared/ui";
import { useToggle } from "@shared/hooks";
import { memo } from "react";

export const AddGameButton = memo(() => {
  const [isOpenModal, openModal, closeModal] = useToggle(false);

  return (
    <>
      <Button
        text="Добавить"
        leftAdornment={<PlusIcon height="24px" width="24px" />}
        onClick={openModal}
      />
      <Modal open={isOpenModal} width="400px" onClose={closeModal}>
        <div className="h-50">asdas</div>
      </Modal>
    </>
  );
});
