import { memo, useEffect, useRef, useState } from 'react';
import { Modal, Tabs } from '@shared/ui';
import { AddSteamGameForm } from '@features/add-steam-game';
import type { AddGameModalTab } from '../model';
import { AddOtherGameForm } from '@features/add-other-game';

interface AddGameModalProps {
  open: boolean;
  onClose(): void;
}

export const AddGameModal = memo((props: AddGameModalProps) => {
  const { onClose } = props;
  const resetRef = useRef<(() => void) | null>(null);
  const [tab, setTab] = useState<AddGameModalTab>('steam');

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        resetRef.current?.();
        setTab('steam');
      }, 300);
    }
  }, [props.open]);

  return (
    <Modal width="800px" {...props}>
      <div className="flex flex-col gap-8">
        <div className="text-2xl font-medium">Добавление игры</div>
        <Tabs<AddGameModalTab>
          value={tab}
          onChange={setTab}
          tabs={[
            {
              label: 'Steam',
              value: 'steam',
            },
            {
              label: 'Другое',
              value: 'other',
            },
          ]}
        />
        {tab === 'steam' && <AddSteamGameForm resetRef={resetRef} onDone={onClose} />}
        {tab === 'other' && <AddOtherGameForm resetRef={resetRef} onDone={onClose} />}
      </div>
    </Modal>
  );
});
