import { useCallback } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { gameApi } from "./game-api";
import type { GetGamesListParams } from "./types";

export const useGetGamesList = (params: GetGamesListParams) => {
  const queryFn = useCallback(() => gameApi.getList(params), [params]);

  return useQuery({
    queryKey: ["games-list", params],
    queryFn,
    placeholderData: keepPreviousData,
    staleTime: 0,
    gcTime: 0,
  });
};
