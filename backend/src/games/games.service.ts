import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { MinioService } from '@modules/minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { SteamClient } from '../steam/steam.client';
import { SearchFromSteamDto } from './dto/search-from-steam.dto';
import { CreateFromSteamDto } from './dto/create-from-steam.dto';
import { GetListDto } from './dto/get-list.dto';
import { CreateDto } from './dto/create.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GamesService {
  constructor(
    private prisma: PrismaService,
    private steam: SteamClient,
    private minio: MinioService,
    private config: ConfigService,
  ) {}

  async searchFromSteam(dto: SearchFromSteamDto) {
    const { query } = dto;
    const data = await this.steam.searchApp(query);

    return {
      items: data?.items ?? [],
    };
  }

  async createFromSteam(dto: CreateFromSteamDto) {
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

    const gameId = uuid();

    const imagePath = await this.loadGameImage({
      gameId,
      imageUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/library_600x900.jpg`,
    });

    return this.prisma.game.create({
      data: {
        id: gameId,
        name: data.name,
        image: imagePath,
        steam_app_id: data.steam_appid,
      },
    });
  }

  async create(dto: CreateDto) {
    const { image, name } = dto;

    const existingGame = await this.prisma.game.findFirst({
      where: { name },
    });

    if (existingGame) {
      throw new ConflictException(`Игра с названием ${name} уже существует`);
    }

    const gameId = uuid();

    const imagePath = await this.loadGameImage({
      gameId,
      imageUrl: image,
    });

    return this.prisma.game.create({
      data: {
        id: gameId,
        name,
        image: imagePath,
      },
    });
  }

  async getList(params: GetListDto) {
    const where = params.name
      ? {
          name: {
            contains: params.name,
            mode: 'insensitive' as const,
          },
        }
      : undefined;
    const [items, count] = await this.prisma.$transaction([
      this.prisma.game.findMany({ where, orderBy: { name: 'asc' } }),
      this.prisma.game.count({ where }),
    ]);
    return { items, count };
  }

  private async loadGameImage({
    gameId,
    imageUrl,
  }: {
    gameId: string;
    imageUrl: string;
  }): Promise<string> {
    const response = await fetch(imageUrl);

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
}
