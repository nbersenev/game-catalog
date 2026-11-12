import type { GetGamesListParams } from './types';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { gamesApi } from './games-api';

export const useGetGamesListQuery = (params: GetGamesListParams) => {
  const queryFn = useCallback(() => gamesApi.getList(params), [params]);

  return useQuery({
    queryKey: ['games-list', params],
    queryFn,
    placeholderData: keepPreviousData,
    staleTime: 0,
    gcTime: 0,
  });
};
