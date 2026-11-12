export interface GetGamesListParams {
  name?: string;
}

export interface SearchSteamParams {
  query: string;
}

export interface CreateGameRequest {
  name: string;
  image: string;
}

export interface CreateGameFromSteamRequest {
  steamAppId: number;
}
