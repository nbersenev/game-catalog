import {
  useCreateGameFromSteamMutation,
  useSearchSteamGamesMutation,
} from '@entities/game';
import { Button, Input, SearchIcon } from '@shared/ui';
import { memo, useCallback, useEffect, useRef, useState, type RefObject } from 'react';

interface AddSteamGameProps {
  resetRef?: RefObject<(() => void) | null>;
  onDone?(): void;
}

export const AddSteamGameForm = memo(({ resetRef, onDone }: AddSteamGameProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const { mutate, reset, data, isSuccess, isPending } = useSearchSteamGamesMutation();
  const { mutateAsync } = useCreateGameFromSteamMutation();

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

  const handleReset = useCallback(() => {
    setQuery('');
    reset();
  }, [reset]);

  const handleAddFactory = useCallback(
    (id: number) => async () => {
      try {
        setLoading(prevState => ({ ...prevState, [id]: true }));
        await mutateAsync({ steamAppId: String(id) });
        onDone?.();
      } finally {
        setLoading(prevState => ({ ...prevState, [id]: false }));
      }
    },
    [mutateAsync, onDone],
  );

  useEffect(() => {
    if (resetRef) {
      resetRef.current = handleReset;
    }
  }, [resetRef, handleReset]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={query}
        onChange={handleChangeQuery}
        leftAdornment={<SearchIcon height="20px" width="20px" />}
        placeholder="Найти игру в Steam..."
        isLoading={isPending}
      />
      {data?.items?.map(({ id, tiny_image, name }) => (
        <div
          key={id}
          className="bg-[#3d5d85] rounded-lg flex items-center gap-4 pr-4 overflow-hidden">
          <img src={tiny_image} alt="" style={{ boxShadow: '0 0 10px black' }} />
          <div className="font-medium grow">{name}</div>
          <Button
            text="Добавить"
            size="medium"
            isLoading={loading[id]}
            onClick={handleAddFactory(id)}
          />
        </div>
      ))}
      {isSuccess && !isPending && !data?.items?.length && (
        <div className="text-center">Ничего не найдено</div>
      )}
    </div>
  );
});
