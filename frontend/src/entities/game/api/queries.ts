import type { GetGamesListParams, SearchSteamParams } from "./types";

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { gamesApi } from "./games-api";

export const useGetGamesList = (params: GetGamesListParams) => {
  const queryFn = useCallback(() => gamesApi.getList(params), [params]);

  return useQuery({
    queryKey: ["games-list", params],
    queryFn,
    placeholderData: keepPreviousData,
    staleTime: 0,
    gcTime: 0,
  });
};

export const useSearchSteamGames = () => {
  const mutationFn = useCallback((params: SearchSteamParams) => gamesApi.searchSteam(params), []);

  return useMutation({
    mutationFn,
  });
};
