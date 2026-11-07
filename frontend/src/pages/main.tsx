import { GameCard, useGetGamesList } from "@entities/game";

export const MainPage = () => {
  const { data } = useGetGamesList();
  const games = data?.items || [];

  return (
    <div className="grid grid-cols-8 gap-8 p-8">
      {games.map((game) => (
        <GameCard key={game.id} data={game} />
      ))}
    </div>
  );
};
