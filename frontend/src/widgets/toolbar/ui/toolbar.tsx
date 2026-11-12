import { Button, GamepadIcon, Input, PlusIcon, SearchIcon } from '@shared/ui';
import { memo, useCallback, useState } from 'react';
import { pluralize } from '@shared/lib/pluralize';

import styles from './toolbar.module.css';
import { useToggle } from '@shared/hooks';
import { AddGameModal } from '@widgets/add-game-modal';

interface ToolbarProps {
  count: number;
  isLoading?: boolean;
  onChangeQuery(value: string): void;
}

export const Toolbar = memo(({ count, isLoading, onChangeQuery }: ToolbarProps) => {
  const [isOpenModal, openModal, closeModal] = useToggle(false);
  const [inputValue, setInputValue] = useState('');

  const handleChangeSearchValue = useCallback(
    (value: string) => {
      setInputValue(value);
      onChangeQuery(value);
    },
    [onChangeQuery],
  );

  return (
    <>
      <div className={styles.toolbar}>
        <div className="flex items-center gap-4 w-full">
          <Button
            text="Добавить"
            leftAdornment={<PlusIcon height="24px" width="24px" />}
            onClick={openModal}
          />
          <div className="w-1/4">
            <Input
              value={inputValue}
              onChange={handleChangeSearchValue}
              placeholder="Найти игру..."
              leftAdornment={<SearchIcon height="20px" width="20px" />}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="flex flex-none items-center gap-4">
          <GamepadIcon height="24px" width="24px" />
          <div className="text-xl text-medium">
            {count} {pluralize(count, 'игра', 'игры', 'игр')}
          </div>
        </div>
      </div>
      <AddGameModal open={isOpenModal} onClose={closeModal} />
    </>
  );
});
