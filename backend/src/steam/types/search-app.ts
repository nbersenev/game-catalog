export interface SearchAppParams {
  term: string;
  l?: string;
  cc: string;
}

export interface SearchAppResponse {
  total: number;
  items: {
    type: string,
    name: string,
    id: number,
    price: {
        currency: string,
        initial: number,
        final: number,
    },
    tiny_image: string,
    string: string,
    platforms: {
        windows: boolean,
        mac: boolean,
        linux: boolean,
    },
    streamingvideo: boolean,
    controller_support: string
  }[];
}