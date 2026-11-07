import { httpClient } from "@shared/api/httpClient";
import type { CollectionResponse } from "@shared/api/types";

import type { Game } from "../model";

export const gameApi = {
  getList: () =>
    httpClient.get<CollectionResponse<Game>>("/games").then((data) => data),
};
