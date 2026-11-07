export interface GetAppDetailsParams {
  appids: string;
  l?: string;
  cc: string;
}

export interface GetAppDetailsResponse {
  [appId: string]: {
    success: boolean;
    data?: {
      type: string;
      name: string;
      steam_appid: number;
      required_age: string;
      is_free: boolean;
      detailed_description: string;
      about_the_game: string;
      short_description: string;
      header_image: string;
      capsule_image: string;
      capsule_imagev5: string;
      pc_requirements: {
        minimum: string;
        recommended: string;
      };
      developers: string[];
      publishers: string[];
      platforms: {
        windows: boolean;
        mac: boolean;
        linux: boolean;
      };
      metacritic: {
        score: number;
        url: string;
      };
      screenshots: {
        id: number;
        path_thumbnail: string;
        path_full: string;
      }[];
      movies: {
        id: number;
        name: string;
        thumbnail: string;
        dash_av1: string;
        dash_h264: string;
        hls_h264: string;
        highlight: boolean;
      }[];
      release_date: {
        coming_soon: boolean;
        date: string;
      };
      background: string;
      background_raw: string;
    };
  };
}
