export interface Game {
  id: string;
  name: string;
  steam_app_id?: string;
  image?: string;
  created_at: string;
  updated_at?: string;
}

export interface SteamGame {
  type: string;
  name: string;
  id: number;
  price: {
    currency: string;
    initial: number;
    final: number;
  };
  tiny_image: string;
  string: string;
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  streamingvideo: boolean;
  controller_support: string;
}
