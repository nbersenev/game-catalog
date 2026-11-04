import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SearchAppParams, SearchAppResponse } from './types/search-app';

@Injectable()
export class SteamClient {
  constructor(private readonly httpService: HttpService) {}

  async searchApp(term: string) {
    const response = await firstValueFrom(this.httpService.get<SearchAppResponse>('https://store.steampowered.com/api/storesearch', {
      params: {
        term,
        l: 'russian',
        cc: 'us',
      } as SearchAppParams
    }));
    
    return response.data;
  }
}