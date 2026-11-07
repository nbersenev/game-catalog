import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { MinioService } from '@modules/minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { SteamClient } from '../steam/steam.client';
import { SearchGameDto } from './dto/search-game.dto';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(
    private prisma: PrismaService,
    private steam: SteamClient,
    private minio: MinioService,
    private config: ConfigService,
  ) {}

  async search(dto: SearchGameDto) {
    const { query } = dto;
    const data = await this.steam.searchApp(query);

    return {
      items: data?.items ?? [],
    };
  }

  private async loadCoverImageFromSteam({
    gameId,
    steamAppId,
  }: {
    gameId: string;
    steamAppId: number;
  }): Promise<string> {
    const previewUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/library_600x900.jpg`;
    const response = await fetch(previewUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType =
      response.headers.get('content-type') || 'application/octet-stream';
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const objectName = `/games/${gameId}/cover.jpg`;

    await this.minio.putObject(
      this.config.get('MINIO_BUCKET', 'default'),
      objectName,
      buffer,
      buffer.length,
      {
        'Content-Type': contentType,
      },
    );

    return objectName;
  }

  async createFromSteam(dto: CreateGameDto) {
    const { steamAppId } = dto;

    const existingGame = await this.prisma.game.findFirst({
      where: { steam_app_id: steamAppId },
    });

    if (existingGame) {
      throw new ConflictException(
        `Игра с steam_app_id ${steamAppId} уже существует`,
      );
    }

    const data = await this.steam.getAppDetails(steamAppId);

    if (!data) {
      throw new NotFoundException(
        'Не удалось получить данные по игре из Steam',
      );
    }

    const game = await this.prisma.game.create({
      data: {
        name: data.name,
        steam_app_id: data.steam_appid,
      },
    });

    const imagePath = await this.loadCoverImageFromSteam({
      gameId: game.id,
      steamAppId: data.steam_appid,
    });

    await this.prisma.game.update({
      data: {
        image: imagePath,
      },
      where: {
        id: game.id,
      },
    });
  }

  getList() {
    return this.prisma.game.findMany();
  }
}
