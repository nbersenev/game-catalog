import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "./game-api";

export const useGetGamesList = () => {
  const queryFn = useCallback(() => gameApi.getList(), []);

  return useQuery({
    queryKey: ["games-list"],
    queryFn,
  });
};
