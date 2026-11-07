import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SearchAppParams, SearchAppResponse } from './types/search-app';
import {
  GetAppDetailsParams,
  GetAppDetailsResponse,
} from './types/get-app-details';

@Injectable()
export class SteamClient {
  constructor(private readonly httpService: HttpService) {}

  async searchApp(term: string) {
    const response = await firstValueFrom(
      this.httpService.get<SearchAppResponse>(
        'https://store.steampowered.com/api/storesearch',
        {
          params: {
            term,
            l: 'russian',
            cc: 'ua',
          } as SearchAppParams,
        },
      ),
    );

    return response.data;
  }

  async getAppDetails(appId: number) {
    console.log(appId);
    const response = await firstValueFrom(
      this.httpService.get<GetAppDetailsResponse>(
        'https://store.steampowered.com/api/appdetails',
        {
          params: {
            appids: String(appId),
            l: 'russian',
            cc: 'ua',
          } as GetAppDetailsParams,
        },
      ),
    );

    return response.data?.[String(appId)]?.data;
  }
}
