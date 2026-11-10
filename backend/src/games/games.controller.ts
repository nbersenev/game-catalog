import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GamesService } from "./games.service";
import { SearchFromSteamDto } from "./dto/search-from-steam.dto";
import { CreateFromSteamDto } from "./dto/create-from-steam.dto";
import { GetListDto } from "./dto/get-list.dto";

@Controller("games")
export class GamesController {
  constructor(private games: GamesService) {}

  @Get("steam")
  async searchFromSteam(@Query() dto: SearchFromSteamDto) {
    const data = await this.games.searchFromSteam(dto);
    return data;
  }

  @Post("steam")
  async createFromSteam(@Body() dto: CreateFromSteamDto) {
    const data = await this.games.createFromSteam(dto);
    return data;
  }

  @Get()
  getList(@Query() params: GetListDto) {
    console.log(params);
    return this.games.getList(params);
  }
}
