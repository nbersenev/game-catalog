import { GameCard, useGetGamesList } from "@entities/game";
import { Toolbar } from "@widgets/toolbar";

export const MainPage = () => {
  const { data } = useGetGamesList();
  const games = data?.items ?? [];
  const count = data?.count ?? 0;

  return (
    <>
      <Toolbar count={count} />
      <div className="pt-24 px-8 pb-8">
        <div className="grid grid-cols-10 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} data={game} />
          ))}
        </div>
      </div>
    </>
  );
};
