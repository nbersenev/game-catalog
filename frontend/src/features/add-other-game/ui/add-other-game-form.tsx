import { memo, useCallback, useEffect, type RefObject } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { AddOtherGameFormData } from '../model';
import { Button, Input } from '@shared/ui';
import { useCreateGameMutation } from '@entities/game';

interface AddOtherGameFormProps {
  resetRef?: RefObject<(() => void) | null>;
  onDone?(): void;
}

export const AddOtherGameForm = memo(({ resetRef, onDone }: AddOtherGameFormProps) => {
  const { control, reset, handleSubmit } = useForm<AddOtherGameFormData>({
    defaultValues: {
      image: '',
      name: '',
    },
  });
  const { mutateAsync, isPending } = useCreateGameMutation();

  const handleAdd = useCallback(
    async (data: AddOtherGameFormData) => {
      await mutateAsync(data);
      onDone?.();
    },
    [onDone],
  );

  useEffect(() => {
    if (resetRef) {
      resetRef.current = reset;
    }
  }, [reset]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Название игры..."
              isError={!!error}
            />
          )}
        />
        <Controller
          control={control}
          name="image"
          rules={{
            required: true,
            validate: (value: string) => {
              const regexp = /^https?:\/\/([\w-]+\.)+[a-z]{2,}(:\d{1,5})?(\/[^\s]*)?$/i;
              return regexp.test(value);
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Ссылка на обложку"
              isError={!!error}
            />
          )}
        />
      </div>
      <div>
        <Button text="Добавить" isLoading={isPending} onClick={handleSubmit(handleAdd)} />
      </div>
    </div>
  );
});
