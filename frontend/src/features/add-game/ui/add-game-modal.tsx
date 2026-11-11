import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input, Modal, SearchIcon } from '@shared/ui';
import { useSearchSteamGames } from '@entities/game';

import styles from './add-game-modal.module.css';

interface AddGameModalProps {
  open: boolean;
  onClose(): void;
}

export const AddGameModal = memo((props: AddGameModalProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [query, setQuery] = useState('');
  const { mutate, data, reset, isPending } = useSearchSteamGames();

  const handleChangeQuery = useCallback(
    (value: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setQuery(value);
      timerRef.current = setTimeout(() => {
        mutate({ query: value });
      }, 1000);
    },
    [mutate],
  );

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setQuery('');
        reset();
      }, 300);
    }
  }, [props.open, reset]);

  return (
    <Modal width="800px" {...props}>
      <div className="flex flex-col gap-8">
        <div className="text-2xl font-medium">Добавление игры</div>
        <div className="flex flex-col gap-4">
          <Input
            value={query}
            onChange={handleChangeQuery}
            leftAdornment={<SearchIcon height="24px" width="24px" />}
            placeholder="Найти игру в Steam..."
            isLoading={isPending}
          />
          {data?.items?.map(({ id, tiny_image, name }) => (
            <div key={id} className="flex items-center gap-4">
              <img src={tiny_image} alt="" />
              <div className="font-medium grow">{name}</div>
              <Button text="Добавить" size="medium" onClick={() => void 0} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
});
