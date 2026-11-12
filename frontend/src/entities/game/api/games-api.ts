import type {
  CreateGameFromSteamRequest,
  CreateGameRequest,
  GetGamesListParams,
  SearchSteamParams,
} from './types';
import type { CollectionResponse } from '@shared/api/types';
import type { Game, SteamGame } from '../model';

import { httpClient } from '@shared/api/httpClient';

export const gamesApi = {
  getList: (params: GetGamesListParams) =>
    httpClient.get<CollectionResponse<Game>>('/games', { params }),
  searchSteam: (params: SearchSteamParams) =>
    httpClient.get<CollectionResponse<SteamGame>>('/games/steam', { params }),
  create: (dto: CreateGameRequest) =>
    httpClient.post<Game, CreateGameRequest>('/games', dto),
  createFromSteam: (dto: CreateGameFromSteamRequest) =>
    httpClient.post<Game, CreateGameFromSteamRequest>('/games/steam', dto),
};
