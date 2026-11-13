import { useCallback, useEffect, useRef, useState } from 'react';
import { GameCard, useGetGamesListQuery } from '@entities/game';
import { Toolbar } from '@widgets/toolbar';

import { EmptyState } from './ui';

export const MainPage = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [filters, setFilters] = useState({ name: '' });
  const { data, isPlaceholderData } = useGetGamesListQuery({
    ...(filters.name && { name: filters.name }),
  });
  const games = data?.items ?? [];
  const count = data?.count ?? 0;

  const handleChangeQuery = useCallback((value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setFilters(prevState => ({ ...prevState, name: value }));
    }, 1000);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  return (
    <>
      <Toolbar
        count={count}
        isLoading={isPlaceholderData}
        onChangeQuery={handleChangeQuery}
      />
      <div className="pt-28 px-8 pb-8 min-h-screen flex flex-col">
        {games.length ? (
          <div className="grid grid-cols-10 gap-8">
            {games.map(game => (
              <GameCard key={game.id} data={game} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
};
