import { useCallback, useEffect, useRef, useState } from "react";
import { GameCard, useGetGamesList } from "@entities/game";
import { Toolbar } from "@widgets/toolbar";

import { EmptyState } from "./ui";

export const MainPage = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [filters, setFilters] = useState({ name: "" });
  const { data, isPlaceholderData } = useGetGamesList({
    ...(filters.name && { name: filters.name }),
  });
  const games = data?.items ?? [];
  const count = data?.count ?? 0;

  const handleChangeQuery = useCallback((value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setFilters((prevState) => ({ ...prevState, name: value }));
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
      <Toolbar count={count} isLoading={isPlaceholderData} onChangeQuery={handleChangeQuery} />
      <div className="pt-28 px-8 pb-8 min-h-screen flex flex-col">
        {!!games.length ? (
          <div className="grid grid-cols-10 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} data={game} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
      {/* <Modal open={true} width="400px" onClose={() => void 0}>
        <div className="h-50">asdas</div>
      </Modal> */}
    </>
  );
};
