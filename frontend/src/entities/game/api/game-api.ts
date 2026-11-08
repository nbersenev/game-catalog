import { httpClient } from "@shared/api/httpClient";
import type { CollectionResponse } from "@shared/api/types";

import type { Game } from "../model";
import type { GetGamesListParams } from "./types";

export const gameApi = {
  getList: (params: GetGamesListParams) =>
    httpClient
      .get<CollectionResponse<Game>>("/games", { params })
      .then((data) => data),
};
