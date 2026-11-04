import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { SearchGameDto } from './dto/search-game.dto';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get('search')
  async search(@Query() dto: SearchGameDto) {
    const data = await this.gamesService.search(dto);
    return data;
  }
}