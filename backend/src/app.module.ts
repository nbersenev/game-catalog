import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { GamesModule } from './games/games.module';
import { MinioModule } from '@modules/minio/minio.module';

@Module({
  imports: [
    PrismaModule,
    MinioModule,
    GamesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
