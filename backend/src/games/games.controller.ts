import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { SearchGameDto } from './dto/search-game.dto';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private games: GamesService) {}

  @Get('search')
  async search(@Query() dto: SearchGameDto) {
    const data = await this.games.search(dto);
    return data;
  }

  @Post('steam')
  async create(@Body() dto: CreateGameDto) {
    console.log(dto);
    const data = await this.games.createFromSteam(dto);
    return data;
  }

  @Get()
  getList() {
    return this.games.getList();
  }
}
