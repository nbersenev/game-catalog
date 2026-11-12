import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'sonner';
import type {
  CreateGameFromSteamRequest,
  CreateGameRequest,
  SearchSteamParams,
} from './types';
import { gamesApi } from './games-api';
import { queryClient } from '@app/providers/query-client-provider';
import type { CollectionResponse } from '@shared/api/types';
import type { Game, SteamGame } from '../model';

export const useSearchSteamGamesMutation = () => {
  const mutationFn = useCallback(
    (params: SearchSteamParams) =>
      gamesApi.searchSteam(params).catch(error => {
        toast.error(error.message);
        throw error;
      }),
    [],
  );

  return useMutation<CollectionResponse<SteamGame> | void, unknown, SearchSteamParams>({
    mutationFn,
  });
};

export const useCreateGameMutation = () => {
  const mutationFn = useCallback(
    (dto: CreateGameRequest) =>
      gamesApi.create(dto).catch(error => {
        toast.error(error.message);
        throw error;
      }),
    [],
  );

  return useMutation<Game | void, unknown, CreateGameRequest>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games-list'] });
    },
  });
};

export const useCreateGameFromSteamMutation = () => {
  const mutationFn = useCallback(
    (dto: CreateGameFromSteamRequest) =>
      gamesApi.createFromSteam(dto).catch(error => {
        toast.error(error.message);
        throw error;
      }),
    [],
  );

  return useMutation<Game | void, unknown, CreateGameFromSteamRequest>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games-list'] });
    },
  });
};
