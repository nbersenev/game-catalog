import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    PrismaModule,
    GamesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}