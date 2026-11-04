import {  Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { SearchGameDto } from './dto/search-game.dto';
import { SteamClient } from '../steam/steam.client';

@Injectable()
export class GamesService {
  constructor(
    private prisma: PrismaService,
    private steamClient: SteamClient
  ) {}

  async search(dto: SearchGameDto) {
    const { query } = dto;
    const data = await this.steamClient.searchApp(query);
    
    return {
      items: data?.items ?? [],
    }
  }
}